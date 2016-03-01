var list = [];

var items = [{
  title: "LG Electronics 43LF5400 43-Inch 1080p LED TV (2015 Model)",
  manufacturer: 'LG',
  image: "images/1.jpg",
  price: 297.99,
  description: ['Refresh Rate: 60Hz (Effective)','Backlight: LED (Edge LED). Smart Functionality: No','Dimensions (W x H x D): TV without stand: 38.2" x 22.6" x 2.3", TV with stand 38.2" x 24.6" x 7.8"','Inputs: 2 HDMI, 1 USB, 1 RF, 1 Component, 1 Composite, 1 Optical, 1 RS232','This product DOES NOT have a Digital Audio Out (Optical).'],
  category: 'Televisions',
  serial: '001'
},
{
  title: 'Sony KDL32R300C 32-Inch 1080p LED TV (2015 Model)',
  manufacturer: 'Sony',
  image: 'images/2.jpg',
  price: 198.00,
  description: ['Refresh Rate: 60Hz (Native); Motionflow XR120 (Effective)','Backlight: LED (Direct-Lit)','Smart Functionality: No','Crisp detail & contrast with Clear Resolution Enhancer','Superior picture delivered via Direct-lit LED panel','Inputs: 2 HDMI, 1 USB'],
  category: 'Televisions',
  serial: '002'
},
{
  title: 'Samsung UN32J5205 32-Inch 1080p Smart LED TV (2015 Model)',
  manufacturer: 'Samsung',
  image: 'images/3.jpg',
  price: 279.99,
  description: ['Refresh Rate: 60CMR (Effective)','Backlight: LED','Smart Functionality: Yes, Built in Wi-Fi: Yes','Dimensions (W x H x D): TV without stand: 29.2" x 17.2" x 3.1", TV with stand: 29.2" x 18.5" x 5.7"','Inputs: 2 HDMI, 1 USB'],
  category: 'Televisions',
  serial: '003'
},
{
  title: 'LG Electronics 50LF6100 50-Inch 1080p Smart LED TV (2015 Model)',
  manufacturer: 'LG',
  image: 'images/4.jpg',
  price: 517.99,
  description: ['Refresh Rate: 120Hz (Effective)','Backlight: LED (Direct)','Smart Functionality: Yes','Dimensions (W x H x D): TV without stand: 44.4" x 25.7" x 2.2", TV with stand: 44.4" x 27.9" x 10"','Inputs: 3 HMDI, 3 USB 2.0, 1 RF, 1 Component, 1 Composite, 1 Digital Audio Out (optical), 1 LAN, 1 RS232'],
  category: 'Televisions',
  serial: '004'
},
{
  title: 'Samsung UN40J5200 40-Inch 1080p Smart LED TV (2015 Model)',
  manufacturer: 'Samsung',
  image: 'images/5.jpg',
  price: 379.99,
  description: ['Refresh Rate: 60CMR (Effective)','Backlight: LED','Smart Functionality: Yes- Built in Wi-Fi','Dimensions (W x H x D): TV without stand: 36.3" x 20.6" x 2.3", TV with stand: 36.3" x 23.2" x 11.3"','Inputs: 2 HDMI, 1 USB'],
  category: 'Televisions',
  serial: '005'
},
{
  title: 'Samsung UN24H4000 24-Inch 720p LED TV (2014 Model)',
  manufacturer: 'Samsung',
  image: 'images/6.jpg',
  price: 149.99,
  description: ['Refresh Rate: 60Hz (Native); 120 Clear Motion Rate (Effective)','Backlight: LED (Edge-Lit)','Smart Functionality: No','Dimensions (W x H x D): TV without stand: 22.1" x 13.7" x 1.9"; TV with stand: 22.1" x 15.1" x 6.4"','Inputs: 2 HDMI, 1 USB','Accessories Included: Standard Remote Control'],
  category: 'Televisions',
  serial: '006'
},
{
  title: 'LG Electronics 32LF500B 32-Inch 720p LED TV (2015 Model)',
  manufacturer: 'LG',
  image: 'images/7.jpg',
  price: 187.99,
  description: ['Refresh Rate: 60Hz (Native)','Backlight: LED (Direct LED)','Smart Functionality: No','Dimension (W x H x D): TV without stand: 29" x 17.3" x 3.6", TV with stand: 29" x 19.1" x 7.1"','Inputs: 3 HDMI, 2 USB 3.0/2.0, 1 RF, 1 Component, 1 Composite, 1 Audio Out (coaxial)'],
  category: 'Televisions',
  serial: '007'
},
{
  title: 'Sony KDL48R510C 48-Inch (47.6" Measured Diagonally) 1080p Smart LED TV (2015 Model)',
  manufacturer: 'Sony',
  image: 'images/8.jpg',
  price: 448.00,
  description: ['Refresh Rate: 60Hz (Native); Motionflow XR 120 (Effective)','Backlight: LED (Edge-Lit)','Smart Functionality: Yes','Dimensions (W x H x D): TV without stand: 42.9" x 21.1" x 2.6", TV with stand: 42.9" x 26.5" x 8.0"','Inputs: 2 HDMI, 2 USB','Accessories Included: Remote, Table Top Stand'],
  category: 'Televisions',
  serial: '008'
},
{
  title: 'Samsung UN32J5003 32-Inch 1080p LED TV (2015 Model)',
  manufacturer: 'Samsung',
  image: 'images/9.jpg',
  price: 247.99,
  description: ['Refresh Rate: 60CMR (Effective)','Backlight: LED','Smart Functionality: No, Built in Wi-Fi: No','TV w/stand- 29.2" x 18.5" x 5.7", TV w/o stand- 29.2" x 17.2" x 3.1".','Inputs: 2 HDMI, 1 USB. Refer to the user manual below before use'],
  category: 'Televisions',
  serial: '009'
},
{
  title: 'Sony KDL40R510C 40-Inch 1080p Smart LED TV (2015 Model)',
  manufacturer: 'Sony',
  image: 'images/10.jpg',
  price: 348.00,
  description: ['Refresh Rate: 60Hz (Native); Motionflow XR 120 (Effective)','Backlight: LED (Edge-Lit)','Smart Functionality: Yes','Dimensions (W x H x D): TV without stand: 42.9" x 21.1" x 2.6", TV with stand: 42.9" x 26.5" x 8.0"','Inputs: 2 HDMI, 2 USB','Accessories Included: Remote, Table Top Stand'],
  category: 'Televisions',
  serial: '010'
},
{
  title: 'Samsung HW-J355 2.1 Channel 120 Watt Wireless Audio Soundbar (2015 Model)',
  manufacturer: 'Samsung',
  image: 'images/11.jpg',
  price: 129.99,
  description: ['37-Inch 120 W (2.1 channels)','Subwoofer: Wired 5.25"','Connectivity: Bluetooth','Wall Mountable: Yes','Inputs: USB, Bluetooth, TV Sound Connect, Optical'],
  category: 'Audio',
  serial: '011'
},
{
  title: 'Sony HT-CT770 2.1 Channel 330W Sound Bar with Wireless Subwoofer',
  manufacturer: 'Sony',
  image: 'images/12.jpg',
  price: 249.99,
  description: ['Length & Power Output: 40.6-Inch 330 W (2.1 Channels) - Ideal for 46-Inch and larger TVs','Subwoofer: Wireless','Connectivity: Bluetooth and NFC','Wall Mountable: Yes; Remote Included: Yes','Inputs: 3 HDMI; 1 Optical; 1 Analog'],
  category: 'Audio',
  serial: '012'
},
{
  title: 'Samsung HW-J450 2.1 Channel 300 Watt Wireless Audio Soundbar (2015 Model)',
  manufacturer: 'Samsung',
  image: 'images/13.jpg',
  price: 227.99,
  description: ['37-Inch 300 W (2.1 channels)','Subwoofer: Wireless 6.5"','Connectivity: Bluetooth','Wall Mountable: Yes','Inputs: 1 HDMI, 1 USB, Bluetooth, TV Sound Connect, 1 Optical'],
  category: 'Audio',
  serial: '013'
},
{
  title: 'Samsung HW-J250 2.2 Channel 80 Watt Audio Soundbar (2015 Model)',
  manufacturer: 'Samsung',
  image: 'images/14.jpg',
  price: 107.99,
  description: ['28.3 - Inch 80W (2.2 Ch)','Subwoofer: N/A','Connectivity: Bluetooth 2.1','Wall Mountable: Yes','Inputs: USB 1.1, TV Sound Connect'],
  category: 'Audio',
  serial: '014'
},
{
  title: 'LG Electronics LAS551H Sound Bar (2015 Model)',
  manufacturer: 'LG',
  image: 'images/15.jpg',
  price: 267.99,
  description: ['Length & Power Output: 35.0" 320W (2.1 channels) - ideal for 40-inch and larger TVs','Subwoofer: Wireless','Connectivity: Bluetooth','Wall Mountable: Yes; Remote Included: Yes','Inputs: 1 HDMI Out; 1HDMI In; Optical; USB (Service Only); 3.5mm'],
  category: 'Audio',
  serial: '015'
},
{
  title: 'Samsung 2.1 Channel 290 Watt Soundbar with Wireless Subwoofer, Bluetooth, HDMI, USB, Optical Audio - HW-HM45C',
  manufacturer: 'Samsung',
  image: 'images/16.jpg',
  price: 155.99,
  description: ['290 Watts','2.1 Channel','Built-in 2 Way Stereo Speakers','Wireless Active Subwoofer'],
  category: 'Audio',
  serial: '016'
},
{
  title: 'LG Electronics LAS454B Soundbar',
  manufacturer: 'LG',
  image: 'images/17.jpg',
  price: 179.00,
  description: ['2.1 Channel','300 Watt','Wireless Subwoofer','Bluetooth Connectivity','Optical Cable Included'],
  category: 'Audio',
  serial: '017'
},
{
  title: 'Sony HT-CT370 2.1 Channel 300W Sound Bar with Wireless Subwoofer, Bluetooth, and NFC',
  manufacturer: 'Sony',
  image: 'images/18.jpg',
  price: 298.00,
  description: ['Length & Power Output: 35.5-Inch 300 W (2.1 Channels) - Ideal for 40-Inch and larger TVs','Subwoofer: Wireless','Connectivity: Bluetooth and NFC','Wall Mountable: Yes; Remote Included: Yes','Inputs: 3 HDMI; 1 Optical; 1 Ananlog'],
  category: 'Audio',
  serial: '018'
},
{
  title: 'LG Electronics LAS450H Sound Bar (2015 Model)',
  manufacturer: 'LG',
  image: 'images/19.jpg',
  price: 185.72,
  description: ['Length & Power Output: 34.7" 220W (2.1 channels) - ideal for 40-inch and larger TVs','Subwoofer: Wireless','Connectivity: Bluetooth','Wall Mountable: Yes; Remote Included: Yes','Inputs: 1 HDMI Out; 1HDMI In; Optical; USB (Service Only); 3.5mm'],
  category: 'Audio',
  serial: '019'
},
{
  title: 'Sony HTCT380 300W 2.1-Channel Sound Bar with Wireless Subwoofer',
  manufacturer: 'Sony',
  image: 'images/20.jpg',
  price: 348.00,
  description: ['300W 2.1 channel sound bar w/wireless subwoofer, Easy set up with 3 HDMI in/1 out and ARC support, Stream music wirelessly w/Bluetooth & NFC connections','Dolby TrueHD & dots-HD Master Audio format support, Full-range speaker w/ unique diffuser for immersive sound','Easily wall mount underneath, or place in-front of your TV, Slim, front-firing, wireless subwoofer fits almost anywhere'],
  category: 'Audio',
  serial: '020'
},
{
  title: 'Samsung Galaxy S6 Factory Unlocked 32GB Smartphone',
  manufacturer: 'Samsung',
  image: 'images/21.jpg',
  price: 499.00,
  description: ['International 4G LTE Capable with 32GB storage','Fingerprint Scanner and Wireless Charging Support','QHD Super AMOLED 5.1" Display with Corning Gorilla Glass 4, and 16MP Main Camera with OIS and 5MP Front Camera','Samsung U.S. Certified Factory Unlocked with U.S. Warranty (model: SM-G920TZKAXAR). Please refer User Manual before use.','Unlocked cell phones are compatible with GSM carriers like AT&T and T-Mobile as well as with GSM SIM cards (e.g. H20, Straight Talk, and select prepaid carriers). Unlocked cell phones will not work with CDMA Carriers like Sprint, Verizon, Boost or Virgin.'],
  category: 'Phones',
  serial: '021'
},
{
  title: 'Samsung Unlocked Galaxy S6 Edge Smartphone with 16 Megapixel Camera, Touch Screen and GPS',
  manufacturer: 'Samsung',
  image: 'images/22.jpg',
  price: 568.96,
  description: ['2G: GSM 850 / 900 / 1800 / 1900, 3G: HSDPA 850 / 900 / 1900 / 2100, 4G: LTE 700 / 800 / 850 / 900 / 1700 (AWS) / 1800 / 1900 / 2100 / 2600 (Bands 1, 2, 3, 4, 5, 7, 8, 12, 17, 18, 19, 26, 28)','5.1-inch Super AMOLED Curved Edge, Multi-Touchscreen with Fingerprint sensor, Samsung Pay and Protective Corning Gorilla Glass 4','Android v5.0.2 (Lollipop), Quad-Core 1.5 GHz Cortex-A53 + Quad-Core 2.1 GHz Cortex-A57 Processor, Chipset: Exynos 742, Mali-T760 Graphics','16 Megapixel Camera (2988 x 5312 pixels) + Front-Facing 5 Megapixel Camera with Dual-Video, Auto HDR, Panorama, and Optical Image Stabilization','Internal Memory: 32GB, 3GB RAM (not expandable)','Unlocked cell phones are compatible with GSM carriers like AT&T and T-Mobile as well as with GSM SIM cards (e.g. H20, Straight Talk, and select prepaid carriers). Unlocked cell phones will not work with CDMA Carriers like Sprint, Verizon, Boost or Virgin'],
  category: 'Phones',
  serial: '022'
},
{
  title: 'Samsung Galaxy Note 5 32GB Factory Unlocked Phone',
  manufacturer: 'Samsung',
  image: 'images/23.jpg',
  price: 603.00,
  description: ['Display: 5.7 inches (75.9 screen-to-body ratio) 1440 x 2560 pixels (518 ppi pixel density)','Camera: 16 MP, 5312 x 2988 pixels, optical image stabilization, autofocus, LED flash','S Voice natural language commands and dictation.','Not compatible with VERIZON, SPRINT, NEXTEL, BOOST, VIRGIN, etc or all NON GSM Carriers'],
  category: 'Phones',
  serial: '023'
},
{
  title: 'LG G3 4G LTE, 32GB, (GSM Unlocked) Smartphone',
  manufacturer: 'LG',
  image: 'images/24.jpg',
  price: 265.00,
  description: ['Experience 4x the resolution of HD, with a 5.5" Quad HD screen','Capture crisp photos using a 13 MP camera with Laser Auto Focus and Optical Image Stabilization (OIS)+','Feel the speed of a 2.5GHz Snapdragon quad-core processor AND 3GB RAM, 32GB ROM (user memory), 32GB (internal memory), Micro SD: 128GB up to 2TB','Quad Band GSM; LTE: 2, 4, 5, 7, 17; UMTS: Band I (2100), Band II (1900), Band IV (1700/2100), Band V (850)','Sync methods: WiFi, USB,4G Capable,4G LTE Capable,Wi-Fi and Mobile Calling','Unlocked cell phones are compatible with GSM carriers like AT&T and T-Mobile as well as with GSM SIM cards (e.g. H20, Straight Talk, and select prepaid carriers). Unlocked cell phones will not work with CDMA Carriers like Sprint, Verizon, Boost or Virgin.'],
  category: 'Phones',
  serial: '024'
},
{
  title: 'LG G4 Unlocked - Black Leather 32GB',
  manufacturer: 'LG',
  image: 'images/25.jpg',
  price: 379.99,
  description: ['Unlocked, multi-mode device - compatible all US carriers including AT&T, Verizon, T-Mobile and Sprint, as well as MVNOs (Mobile Virtual Network Operators) and most international carriers.','16 MP Camera with f/1.8 low-light lens, Manual Mode, Optical Image Stabilization, Laser Autofocus, and high-res image sensors','User removable/replaceable 3000 mAH battery - Swap out to a fully charged battery in an instant! (one battery included in box - additional batteries sold separately)','32GB Internal with Micro SD Card Slot Supporting up to 2 TB (Micro SD Card sold Separately)'],
  category: 'Phones',
  serial: '025'
},
{
  title: 'LG V10 5.7" 16MP 64GB Dual Sim 4G LTE Smartphone',
  manufacturer: 'LG',
  image: 'images/26.jpg',
  price: 600.00,
  description: ['Android OS, v5.1.1 (Lollipop)','64 GB, 4 GB RAM, microSD, up to 128 GB','16 MP, 5312 x 2988 pixels, laser autofocus, optical image stabilization, LED flas','Fingerprint, accelerometer, gyro, proximity, compass, color spectrum','HSDPA 850 / 900 / 1900 / 2100, LTE Band 900/1800/1900/2100/2300/2600(7)/2600(38)/2600(41)'],
  category: 'Phones',
  serial: '026'
},
{
  title: 'Sony Xperia Z5 32GB GSM/LTE - Unlocked phone',
  manufacturer: 'Sony',
  image: 'images/27.jpg',
  price: 579.99,
  description: ['23MP Camera with the worlds fastest Autofocus*, highest low-light sensitivity, and highest dxo Score for video stabilization','PS4 Remote Play lets you extend your PlayStation games on your Phone via your local Wi-Fi','Hi-Res audio delivers a fully immersive and spectacularly detailed audio experience','Water and dust resistant design keeps you going even in a downpour','SIM Unlocked means no contracts or commitment to a Specific carrier. A Nano SIM card is required.'],
  category: 'Phones',
  serial: '027'
},
{
  title: 'Sony Xperia M5 16GB 5-inch 4G LTE Factory Unlocked',
  manufacturer: 'Sony',
  image: 'images/28.jpg',
  price: 369.99,
  description: ['5-inch IPS LCD capacitive touchscreen with 1080 x 1920 Resolution Display','Mediatek MT6795, Octa-core 2.0 GHz Cortex-A53 CPU','16GB ROM, 3GB RAM; Supports Micro-SD up to 200 GB','Main Camera: 21.5 MP, Phase detection autofocus, LED flash; Front Camera: 13 MP, Autofocus, LED flash; 1080p@30fps video.','Nano SIM; Works with GSM carriers such as AT&T, T-Mobile etc. No LTE in North America'],
  category: 'Phones',
  serial: '028'
},
{
  title: 'Sony Xperia Z3 GSM Cellphone Unlocked',
  manufacturer: 'Sony',
  image: 'images/29.jpg',
  price: 346.00,
  description: ['2G Network GSM 850 / 900 / 1800 / 1900','3G Network HSDPA 850 / 900 / 1700 / 1900 / 2100','4G Network LTE 700 / 850 / 900 / 1800 / 2100 / 2600','Unlocked cell phones are compatible with GSM carriers such as AT&T and T-Mobile, but are not compatible with CDMA carriers such as Verizon and Sprint.','This cell phone may not include a US warranty as some manufacturers do not honor warranties for international version phones. Please contact the seller for specific warranty information.'],
  category: 'Phones',
  serial: '029'
},
{
  title: 'LG G4 Stylus 5.7-Inch 13MP 4G LTE Dual SIM Factory Unlocked',
  manufacturer: 'LG',
  image: 'images/30.jpg',
  price: 224.95,
  description: ['5.7-inch WQHD with 720 x 1280 Resolution Display','Qualcomm Snapdragon Quad-core 1.2 GHz','16GB ROM, 1GB RAM; Supports Micro-SD up to 32GB','Main Camera: 13MP, Geo-tagging, touch focus, face detection, HDR, panorama; Front Camera: 5 MP.','Micro Dual SIM; Works with GSM carriers such as AT&T, T-Mobile etc.(3G ONLY)'],
  category: 'Phones',
  serial: '030'
}];
