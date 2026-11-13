/**
 * Single source of truth: IconName → Lucide Astro component (tree-shaken imports).
 * Brand labels use closest Lucide metaphors (no brand logos in Lucide).
 */
import type { AstroComponent } from 'astro/types';
import Activity from '@lucide/astro/icons/activity';
import AppWindow from '@lucide/astro/icons/app-window';
import ArrowRight from '@lucide/astro/icons/arrow-right';
import ArrowUpRight from '@lucide/astro/icons/arrow-up-right';
import BarChart3 from '@lucide/astro/icons/chart-column';
import Bell from '@lucide/astro/icons/bell';
import BookOpen from '@lucide/astro/icons/book-open';
import BookX from '@lucide/astro/icons/book-x';
import Bot from '@lucide/astro/icons/bot';
import Calendar from '@lucide/astro/icons/calendar';
import Check from '@lucide/astro/icons/check';
import ChevronDown from '@lucide/astro/icons/chevron-down';
import ChevronLeft from '@lucide/astro/icons/chevron-left';
import ChevronRight from '@lucide/astro/icons/chevron-right';
import CircleCheck from '@lucide/astro/icons/circle-check';
import CircleHelp from '@lucide/astro/icons/circle-question-mark';
import Clock from '@lucide/astro/icons/clock';
import Cloud from '@lucide/astro/icons/cloud';
import Cpu from '@lucide/astro/icons/cpu';
import Crosshair from '@lucide/astro/icons/crosshair';
import Crown from '@lucide/astro/icons/crown';
import Eye from '@lucide/astro/icons/eye';
import FileText from '@lucide/astro/icons/file-text';
import Fingerprint from '@lucide/astro/icons/fingerprint-pattern';
import Focus from '@lucide/astro/icons/focus';
import Gamepad2 from '@lucide/astro/icons/gamepad-2';
import Gauge from '@lucide/astro/icons/gauge';
import GitCompare from '@lucide/astro/icons/git-compare';
import HardDrive from '@lucide/astro/icons/hard-drive';
import Headphones from '@lucide/astro/icons/headphones';
import LayoutDashboard from '@lucide/astro/icons/layout-dashboard';
import LayoutGrid from '@lucide/astro/icons/layout-grid';
import Layers from '@lucide/astro/icons/layers';
import LocateFixed from '@lucide/astro/icons/locate-fixed';
import Lock from '@lucide/astro/icons/lock';
import Mail from '@lucide/astro/icons/mail';
import Map from '@lucide/astro/icons/map';
import Menu from '@lucide/astro/icons/menu';
import MessageCircle from '@lucide/astro/icons/message-circle';
import Monitor from '@lucide/astro/icons/monitor';
import MousePointer from '@lucide/astro/icons/mouse-pointer';
import Newspaper from '@lucide/astro/icons/newspaper';
import Package from '@lucide/astro/icons/package';
import Palette from '@lucide/astro/icons/palette';
import Radar from '@lucide/astro/icons/radar';
import RefreshCw from '@lucide/astro/icons/refresh-cw';
import Repeat from '@lucide/astro/icons/repeat';
import ScanEye from '@lucide/astro/icons/scan-eye';
import Settings from '@lucide/astro/icons/settings';
import Shield from '@lucide/astro/icons/shield';
import ShieldCheck from '@lucide/astro/icons/shield-check';
import ShoppingBag from '@lucide/astro/icons/shopping-bag';
import Sparkles from '@lucide/astro/icons/sparkles';
import Satellite from '@lucide/astro/icons/satellite';
import Sword from '@lucide/astro/icons/sword';
import Table from '@lucide/astro/icons/table';
import Tag from '@lucide/astro/icons/tag';
import Target from '@lucide/astro/icons/target';
import Truck from '@lucide/astro/icons/truck';
import UserCheck from '@lucide/astro/icons/user-check';
import UserRound from '@lucide/astro/icons/user-round';
import Users from '@lucide/astro/icons/users';
import Search from '@lucide/astro/icons/search';
import VideoOff from '@lucide/astro/icons/video-off';
import Wifi from '@lucide/astro/icons/wifi';
import X from '@lucide/astro/icons/x';
import Zap from '@lucide/astro/icons/zap';

import type { IconName } from './types';

export const iconRegistry: Record<IconName, AstroComponent> = {
  arrowRight: ArrowRight,
  arrowUpRight: ArrowUpRight,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronDown: ChevronDown,
  menu: Menu,
  check: Check,
  x: X,
  circleCheck: CircleCheck,
  crosshair: Crosshair,
  eye: Eye,
  radar: Radar,
  target: Target,
  shield: Shield,
  shieldCheck: ShieldCheck,
  zap: Zap,
  layers: Layers,
  monitor: Monitor,
  stream: VideoOff,
  package: Package,
  settings: Settings,
  alert: Bell,
  users: Users,
  search: Search,
  userRound: UserRound,
  headphones: Headphones,
  tag: Tag,
  mail: Mail,
  calendar: Calendar,
  clock: Clock,
  refresh: RefreshCw,
  cpu: Cpu,
  wifi: Wifi,
  appWindow: AppWindow,
  gamepad2: Gamepad2,
  messageCircle: MessageCircle,
  navFeatures: Sparkles,
  navCheats: Sword,
  navProducts: Layers,
  navBlog: Newspaper,
  navFaq: CircleHelp,
  navSupport: Headphones,
  espActive: Eye,
  radarOnline: Radar,
  seasonBuild: Zap,
  undetected: Shield,
  softAim: Crosshair,
  noRecoil: Target,
  streamProof: VideoOff,
  lootEsp: Package,
  skeletonEsp: ScanEye,
  uavRadar: Satellite,
  mapHack: Map,
  support247: Headphones,
  instantDelivery: Truck,
  rankedSafe: ShieldCheck,
  triggerBot: Focus,
  boneSelect: LocateFixed,
  liveStatus: Activity,
  autoUpdates: RefreshCw,
  featureAimbot: Crosshair,
  featureEsp: Eye,
  featureRadar: Radar,
  featureNoRecoil: Target,
  featureUtilitySuite: Layers,
  whyShield: Shield,
  whyUsers: Users,
  whyMonitor: Monitor,
  whyHeadphones: Headphones,
  stepCheck: Check,
  stepPackage: Package,
  stepZap: Zap,
  stepSettings: Settings,
  stepCrosshair: Crosshair,
  toolkitCombat: Crosshair,
  toolkitVision: Eye,
  toolkitRadar: Radar,
  toolkitWeapons: Target,
  toolkitMovement: Zap,
  toolkitProfiles: Settings,
  workflowAlert: Bell,
  workflowPackage: Package,
  workflowSettings: Settings,
  workflowCheck: Check,
  fieldCalendar: Calendar,
  fieldShield: Shield,
  fieldHeadphones: Headphones,
  heroStatStream: VideoOff,
  heroStatClock: Clock,
  heroStatUsers: Users,
  heroStatHeadphones: Headphones,
  tierLite: Eye,
  tierPro: Crosshair,
  tierElite: Zap,
  coreProduct: Package,
  externalSuite: Cpu,
  dmaHardware: HardDrive,
  systemUtility: Settings,
  accountRecovery: Mail,
  cosmetic: Palette,
  acqPackage: Package,
  acqSettings: Settings,
  acqZap: Zap,
  acqCheck: Check,
  compatWindows: AppWindow,
  compatPackage: Package,
  compatSteam: Gamepad2,
  compatMonitor: Monitor,
  compatRefresh: RefreshCw,
  compatWifi: Wifi,
  compatDiscord: MessageCircle,
  compatShield: Shield,
  comparePlayerEsp: Eye,
  compareWardLocator: ScanEye,
  compareRuneTimer: Clock,
  compareZoomHack: LocateFixed,
  compareStreamproof: VideoOff,
  compareMinimapHack: Map,
  compareAutoCombo: Crosshair,
  compareOrbwalker: MousePointer,
  compareTargetSelector: Target,
  compareActivator: Zap,
  compareAbilityRadius: Radar,
  compareSmokeAlert: Bell,
  compareAutoFarm: Bot,
  compareAutoKillSteal: Sword,
  compareAutoDagon: Sparkles,
  compareFullMapHack: LayoutGrid,
  compareSkinChanger: Palette,
  comparePriorityPatch: Crown,
  compareDevSupport: Headphones,
  compareCloudBackup: Cloud,
  sidebarHub: LayoutDashboard,
  sidebarLite: Eye,
  sidebarPro: Crosshair,
  sidebarElite: Zap,
  sidebarSkin: Palette,
  sidebarHwid: Fingerprint,
  sidebarUgc: FileText,
  faqStatus: Bell,
  faqAfterBuy: ShoppingBag,
  faqBanRisk: ShieldCheck,
  faqPlatforms: AppWindow,
  faqLicenseMove: Repeat,
  faqProductsPage: LayoutGrid,
  faqWhatIsEsp: Eye,
  faqEspVsScripts: GitCompare,
  faqWhichTierEsp: Map,
  faqWhichTierScripts: Crosshair,
  faqRankTiers: BarChart3,
  faqEliteSlots: Crown,
  faqStreamProof: VideoOff,
  faqUndetected: Shield,
  faqEspSafer: Eye,
  faqHwidWhen: Fingerprint,
  faqUgcWhat: FileText,
  faqSkinChanger: Palette,
  faqExternalLoader: HardDrive,
  faqBlogVsCheats: BookX,
  faqBlogSetup: BookOpen,
  faqComparePlans: Table,
  faqWhoLite: UserCheck,
  faqWhoPro: Sword,
  faqWhoElite: Sparkles,
  faqVacUpdate: RefreshCw,
  faqDiscordHelp: Headphones,
  faqTurboRanked: Gauge,
  faqZoomHack: LocateFixed,
  faqAutoFarm: Bot,
  faqPrivateCheats: Lock,
  faqMore: CircleHelp,
  faqBlogGuideStart: BookX,
  faqBlogGuideTier: Package,
  faqBlogGuideStatus: RefreshCw,
  faqBlogSetupLoader: Settings,
  faqBlogSetupLobby: Target,
  faqBlogSecVac: Shield,
  faqBlogDefault1: Bell,
  faqBlogDefault2: Headphones,
  faqBlogDefault3: RefreshCw,
  faqBlogSlugEsp: Eye,
  faqBlogSlugScripts: Crosshair,
  faqBlogSlugHwid: Fingerprint,
  reqWindows: AppWindow,
  reqSteam: Gamepad2,
  reqSettings: Settings,
  reqWifi: Wifi,
  reqCpu: Cpu,
  reqRestorePoint: RefreshCw,
  reqShieldGuide: ShieldCheck,
  reqMailOrder: Mail,
  reqShieldAccount: Shield,
  reqWifiPortal: Wifi,
};
