A Minecraft-Lobby programmed in [Minestom](https://github.com/Minestom/Minestom) (not usable due to missing major components)
```kotlin
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import com.google.gson.reflect.TypeToken
import eu.thesimplecloud.api.eventapi.IListener
import eu.vironlab.vextension.item.Material
import eu.vironlab.vextension.item.builder.createItem
import eu.vironlab.vextension.item.builder.dynamicItem
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import net.kyori.adventure.text.Component
import net.minestom.server.MinecraftServer
import net.minestom.server.coordinate.Vec
import net.minestom.server.entity.Player
import net.minestom.server.network.packet.server.play.TimeUpdatePacket
import net.minestom.server.particle.Particle
import net.minestom.server.particle.ParticleCreator
import net.minestom.server.potion.Potion
import net.minestom.server.potion.PotionEffect
import net.minestom.server.timer.ExecutionType
import net.neverstopgaming.backend.InitializerObject
import net.neverstopgaming.backend.util.Misc.parseMini
import net.neverstopgaming.minestom.Main
import net.neverstopgaming.minestom.extension.MiscExtensions.nsgPlayer
import net.neverstopgaming.minestom.extension.Style
import net.neverstopgaming.minestom.lobby.commands.Irgendwas
import net.neverstopgaming.minestom.lobby.commands.LobbyCommand
import net.neverstopgaming.minestom.lobby.commands.Resource
import net.neverstopgaming.minestom.lobby.commands.Top
import net.neverstopgaming.minestom.lobby.config.Config
import net.neverstopgaming.minestom.lobby.events.MiscEvents
import net.neverstopgaming.minestom.lobby.events.PlayerEvent
import net.neverstopgaming.minestom.lobby.item.ItemInit
import net.neverstopgaming.minestom.lobby.utils.Reward
import net.neverstopgaming.minestom.lobby.utils.Scoreboard
import net.neverstopgaming.minestom.lobby.utils.armorstand.ArmorStands
import net.neverstopgaming.minestom.lobby.utils.xp.XPPlayerCount
import net.neverstopgaming.minestom.objects.WorldPosition
import net.neverstopgaming.minestom.vextension.MinestomGUI
import java.io.File
import java.io.FileReader
import kotlin.math.cos
import kotlin.math.sin

class Lobby : IListener {
    init {
        instance = this
    }

    internal lateinit var config: Config
    private lateinit var configFile: File
    internal lateinit var spawn: WorldPosition
    internal lateinit var prefix: Component
    internal lateinit var navigator: MinestomGUI
    val gson: Gson = GsonBuilder().setPrettyPrinting().disableHtmlEscaping().create()
    var lastMinuteTick: List<Double> = listOf()
    fun onEnable() {
        //<editor-fold defaultstate="collapsed" desc="Config initializer">
        this.configFile = File("lobby_config.json").apply { createNewFile() }
        config = try {
            FileReader(configFile, Charsets.UTF_8).use { gson.fromJson(it, object : TypeToken<Config>() {}.type) }
        } catch (e: Exception) {
            Config()
        }
        saveConfig()
        this.prefix = try {
            InitializerObject.initializer.languagePool.getMessage("english", "nsg.prefix")!!.parseMini()
        } catch (_: Throwable) {
            Component.text("nsg.prefix")
        }
        for (wF in File(".").listFiles()!!.filter { it.isDirectory && File(it, "uid.dat").exists() }) {
            try {
                println("Loading world $wF")
                Main.loadWorld(wF.name)
            } catch (e: Throwable) {
                println("Failed to load world $wF")
                e.printStackTrace(System.out)
            }
        }
        //</editor-fold>
        println("Events and Commands init...")
        //<editor-fold defaultstate="collapsed" desc="Events and Commands">
        PlayerEvent
        MiscEvents
        LobbyCommand
        Top
        Resource
        Irgendwas
        XPPlayerCount()
        //</editor-fold>
        println("Sidebar Init...")
        Scoreboard.init()
        println("Navigator Init...")
        updateNavigator()
        spawn = ((config.navigator).find {
            it.name == config.spawnName
        }?.location ?: WorldPosition("fallback", 2.0, 3.0, 2.0, 0.0F, 0.0F))
        spawn.world()?.timeRate = 0 // Disables Cycles
        spawn.world()?.timeUpdate = null // Disables Cycles
        for (p in MinecraftServer.getConnectionManager().onlinePlayers) {
            p.setLobbyInventory()
        }
        particleTask()
        timeTask()
        Reward
        ArmorStands
        Style.enableUpdates()
        println("LOBBY INIT DONE")
    }

    fun saveConfig() {
        configFile.writeText(gson.toJson(config))
    }

    internal var particle: Particle? = null
    private fun particleTask() {
        val radius = 1.5f
        MinecraftServer.getSchedulerManager().buildTask {
            for (nav in config.navigator) {
                nav.location.let {
                    if (it.world()?.getChunkAt(it.pos())?.let { task -> task.isLoaded && task.viewers.isNotEmpty() } == true) {
                        // send circle of particles to the player
                        for (i in 0..180) {
                            val angle = i * 0.05f
                            val offsetX = radius * sin(angle)
                            val offsetZ = radius * cos(angle)
                            val packet = ParticleCreator.createParticlePacket(
                                particle ?: Particle.PORTAL, it.x + offsetX, it.y, it.z + offsetZ, 0.0f, 0.0f, 0.0f, 1
                            )
                            MinecraftServer.getConnectionManager().onlinePlayers.forEach { p ->
                                p.playerConnection.sendPacket(
                                    packet
                                )
                            }
                        }
                    }
                }
            }
        }.repeat(10, net.minestom.server.utils.time.TimeUnit.SERVER_TICK).executionType(ExecutionType.ASYNC)
            .schedule()
    }

    private fun timeTask() {
        MinecraftServer.getSchedulerManager().buildTask {
            for (p in spawn.world()?.players ?: return@buildTask) {
                p.sendPacket(
                    TimeUpdatePacket(
                        69L,
                        when (p.nsgPlayer().properties["lobby.time"]?.toShort() ?: 0) {
                            0.toShort() -> 6000
                            else -> 18000
                        }
                    )
                )
            }
        }.repeat(config.timeUpdateInTicks.toLong(), net.minestom.server.utils.time.TimeUnit.SERVER_TICK).executionType(ExecutionType.ASYNC)
            .schedule()
    }

    companion object {
        @JvmStatic
        lateinit var instance: Lobby
            private set

        const val DEBUG = false

        @JvmStatic
        val PLACEHOLDER = createItem(Material.BLACK_STAINED_GLASS_PANE) {
            setName(Component.empty())
            setBlockAll(true)
        }

        @JvmStatic
        fun updateNavigator() {
            instance.navigator = MinestomGUI(5, "Navigator".parseMini()).apply {
                setBorder(PLACEHOLDER)
                instance.config.navigator.forEach { item ->
                    setItem(item.slot, dynamicItem({ Material.valueOf(item.item.uppercase()) }) {
                        name {
                            item.name.parseMini(it)
                        }
                        blockAll { true }
                        lore {
                            val player = it?.nsgPlayer()
                            item.lore.map { a -> a.parseMini(player) }.toMutableList()
                        }
                        clickHandler { _, uuid ->
                            val p = MinecraftServer.getConnectionManager().getPlayer(uuid) ?: return@clickHandler
                            val teleport = t@{
                                if (item.location.world() != p.instance)
                                    p.setInstance(item.location.world() ?: return@t, item.location.pos().let { it.withY(it.y + 3.0) })
                                else
                                    p.teleport(item.location.pos())
                            }
                            if (uuid.nsgPlayer().properties["lobby.animations"]?.toIntOrNull() == 1) {
                                teleport()
                                p.closeInventory()
                                return@clickHandler
                            }
                            p.closeInventory()
                            p.addEffect(
                                Potion(
                                    PotionEffect.BLINDNESS,
                                    69,
                                    4000
                                )
                            )
                            p.velocity = Vec(0.0, 15.0, 0.0)
                            GlobalScope.launch {
                                delay(600)
                                teleport()
                                delay(50)
                                p.clearEffects()
                            }

                        }
                    })
                }
            }
        }

        fun Player.setLobbyInventory() {
            inventory.clear()
            ItemInit.initItems(this)
        }
    }
}

```