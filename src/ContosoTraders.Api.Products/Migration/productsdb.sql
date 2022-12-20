use productsdb

DROP TABLE IF EXISTS Brands

CREATE TABLE Brands
(
    Id int NOT NULL,
    Name nvarchar(255) NULL,
    CONSTRAINT PK_Brands PRIMARY KEY(Id)
)

INSERT INTO Brands
VALUES
    (1, 'Microsoft'),
    (2, 'ASUS'),
    (3, 'Dell'),
    (4, 'Acer'),
    (5, 'OnePlus'),
    (6, 'HP'),
    (7, 'Lenovo'),
    (8, 'Samsung'),
    (9, 'ViewSonic'),
    (10,'Zebronics')

DROP TABLE IF EXISTS Features

CREATE TABLE Features
(
    Id int NOT NULL,
    Title nvarchar(255) NULL,
    Description nvarchar(max) NULL,
    ProductItemId int NULL,
    CONSTRAINT PK_Features PRIMARY KEY(Id)
)

INSERT INTO Features
Values
    (1,'Model Number','Model Number: Xbox Series X',1),
    (2,'Additional Content','Additional Content: Series X console, One Wireless Controller, A high-speed HDMI Cable and Power Cable.',1),
    (3,'Model Number','Model Number: Xbox Series X',2),
    (4,'Additional Content','Additional Content: Series X console, One Wireless Controller, A high-speed HDMI Cable and Power Cable.',2),
    (5,'Model Number','Model Number: Xbox Series X',3),
    (6,'Additional Content','Additional Content: Series X console, One Wireless Controller, A high-speed HDMI Cable and Power Cable.',3),
    (7,'Model Number','Model Number: Xbox Series X',4),
    (8,'Additional Content','Additional Content: Series X console, One Wireless Controller, A high-speed HDMI Cable and Power Cable.',4),
    (9,'Model Number','Model Number: Xbox Series X',5),
    (10,'Additional Content','Additional Content: Series X console, One Wireless Controller, A high-speed HDMI Cable and Power Cable.',5),
    (11,'Series','Series : Surface Pro 7',6),
    (12,'Specifications','Specifications : Touchscreen 2-in-1 Laptop (10th Gen Intel Core i5/8GB/256GB SSD/Windows 10 Home/Intel Iris Plus Graphics, 25% Off on Microsoft 365), Black',6),
    (13,'Series','Series : Surface Pro 7',7),
    (14,'Specifications','Specifications : Touchscreen Laptop (8GB/256GB SSD/Windows 11 Home /Radeon Graphics/Platinum/1.265 kg) - 5PB-00023',7),
    (15,'Series','Series : Surface Pro X ',8),
    (16,'Specifications','Specifications :  (Qualcomm Microsoft Sq1/8Gb/128Gb Ssd/Windows 10 Home/Microsoft Sq1 Adreno 685 Gpu Graphics, Wi-Fi), Matte Black',8),
    (17,'Series','Series : Surface GO 2 ',9),
    (18,'Specifications','Specifications :   (Gold Processor 4425Y/8GB/128GB SSD/Windows 10 Home in S Mode/Intel UHD 615 Graphics), Platinum',9),
    (19,'Series','Series : Series : Surface Laptop 3',10),
    (20,'Specifications','Specifications :   (8GB/128GB SSD/Windows 10 Home/Integrated Graphics/Platinum/1.265kg, 25% Off on Microsoft 365), VGY-00021',10),
    (21,'Series','Series : Vivobook 15',11),
    (22,'Specifications','Specifications :(4GB RAM/256GB SSD/Integrated Graphics/Windows 11 Home/Transparent Silver/1.8 Kg), X515MA-BR011W',11),
    (23,'Series','Series : Vivobook S15',12),
    (24,'Specifications','Specifications :Intel Core Evo i5-12500H 12th Gen, Thin and Light Laptop (16GB/512GB SSD/Iris Xe Graphics/Windows 11/Office 2021/Black/1.8 kg) K3502ZA-L502WS',12),
    (25,'Series','Series : TUF Gaming F15',13),
    (26,'Specifications','Specifications :  Intel Core i5-10300H 10th Gen, GTX 1650 4GB Graphics, Gaming Laptop (8GB RAM/512GB NVMe SSD/Windows 11/Black/2.30 Kg), FX506LH-HN258W',13),
    (27,'Series','Series : TUF Gaming A15',14),
    (28,'Specifications','Specifications :AMD Ryzen 7 4800H, 4GB GeForce RTX 3050 Graphics, Gaming Laptop (16GB/512GB SSD/90WHrs Battery/Windows 11/with Office/Black/2.3 kg), FA506ICB-HN075W',14),
    (29,'Series','Series :Vivobook 14',15),
    (30,'Specifications','Specifications :14" (35.56 cms) 2.8K OLED 16:10 90Hz, Thin & Laptop (8GB/512GB SSD/Wins 11/Office 2021/Alexa/Backlit KB/Fingerprint/Black/1.6 kg), X1405ZA-KM311WS',15),
    (31,'Series','Series :  Dell 5410',16),
    (32,'Specifications','Specifications : 16 GB DDR4, 1 TB + 256GB SSD, Windows 11 Home, Office 2021, Dark Shadow Grey Molded (Black), 3 Years, 23.5" FHD',16),
    (33,'Series','Series : Dell 380',17),
    (34,'Specifications','Specifications  (Core2Duo /8 GB RAM / 500 GB HDD/ Windows7 Pro, MS Office/Intel Hd Graphics 17 inches Monitor(1398 x 780)) Silver',17),
    (35,'Series','Series : Dell Optiplex',18),
    (36,'Specifications','Specifications :(Intel i5 3470, 8GB, 500GB HDD, 19 inches HD Monitor, Keyboard, Mouse, HD Webcam, Mic, Speakers, Wifi, Display Port), Windows 10 Pro',18),
    (37,'Series','Series : Acer EK220Q',19),
    (38,'Specifications','Specifications :250 Nits HDMI and VGA Ports Eye Care Features Like Bluelight Shield, Flickerless and Comfy View (1920 x 1080 Pixels, Black)',19),
    (39,'Series','Series : Acer Ha220Q',20),
    (40,'Specifications','Specifications :1920 X 1080 Pixels Full Hd IPS Ultra Slim (6.6Mm Thick) Monitor I Frameless Design I AMD Free Sync I Eye Care Features I Stereo Speakers (White)',20),
    (41,'Series','Series : Acer Aspire C24',21),
    (42,'Specifications','Specifications : Intel Core i5-1035G1 I 8GB DDR4 I 512GB SSD I Windows 11 Home I MS Office Home & Student 2021 I Full HD Camera I Wireless Keyboard & Mouse',21),
    (43,'Model','Model : ROG Phone 2 ZS660KL',22),
    (44,'Specifications','Specifications :8GB RAM, 128GB ROM Snapdragon 855 Plus Processor, 6000 mAh Battery',22),
    (45,'Model','Model : Zenfone 5Z ZS621KL-2A012IN',23),
    (46,'Specifications','Specifications :(Midnight Blue, 6GB RAM, 128GB Storage), Dual SIM, Proximity, Fingerprint sensor, E-compass, Ambient light sensor, Hall sensor, GPS, RGB sensor, Gyro, Video Player, Music Player, Accelerator',23),
    (47,'Model','Model : ZS630KL-2A037WW-cr',24),
    (48,'Specifications','Specifications : (Black, 64 GB) (6 GB RAM),Dual Front Camera, Camera,Flip, Smartphone, 5000 Milliamp Hours',24),
    (49,'Model','Model : Nord CE 2 Lite',25),
    (50,'Specifications','Specifications : 5G (Blue Tide, 6GB RAM, 128GB Storage), 64MP Main Camera with EIS; 2MP Depth Lens and 2MP Macro Lens; Front (Selfie) Camera: 16MP Sony IMX471, 6.59 Inches; 120 Hz Refresh Rate, Qualcomm Snapdragon 695 5G Processor, 5000 mAh Battery with 33W SuperVOOC Charge support',25),
    (51,'Model','Model : Nord 2T ',26),
    (52,'Specifications','Specifications :5G (Gray Shadow, 8GB RAM, 128GB Storage), 50MP Main Camera with Sony IMX766 and OIS, 8MP Ultrawide Camera with 120 degree FOV and 2MP mono lens with Dual LED Flash; 32MP Front (Selfie) Camera with Sony IMX615, 6.43 Inches; 90 Hz AMOLED Display with Corning Gorilla Glass 5, Mediatek Dimensity 1300 Processor, Battery 4500 mAh with 80W SuperVOOC',26),
    (53,'Model','Model : 10R',27),
    (54,'Specifications','Specifications : 5G (Sierra Black, 8GB RAM, 128GB Storage, 80W SuperVOOC), 0MP Main Camera with Sony IMX766 and 2MP Macro Camera with Dual LED Flash; 16MP Front (Selfie) Camera with Sony IMX471, 6.7 Inches; 120 Hz IRIS Display; Resolution: 2400 X 1080 pixels 394 ppi; Aspect Ratio: 20:9, OxygenOS based on Android 12, MTK D8100 Max Processor, In-Display Fingerprint Sensor',27),
    (55,'Model','Model : 10T',28),
    (56,'Specifications','Specifications : 5G (Moonstone Black, 16GB RAM, 256GB Storage)',28),
    (57,'Model Number','Model Number: Xbox Series X ',29),
    (58,'Additional Content','Additional Content: Series X console, One Wireless Controller, A high-speed HDMI Cable and Power Cable.',29),
    (59,'Model Number','Model Number: Xbox Series X ',30),
    (60,'Additional Content','Additional Content: Series X console, One Wireless Controller, A high-speed HDMI Cable and Power Cable.',30),
    (61,'Model Number','Model Number: Xbox Series X ',31),
    (62,'Additional Content','Additional Content: Series X console, One Wireless Controller, A high-speed HDMI Cable and Power Cable.',31),
    (63,'Model Number','Model Number: Xbox Series X ',32),
    (64,'Additional Content','Additional Content: Series X console, One Wireless Controller, A high-speed HDMI Cable and Power Cable.',32),
    (65,'Model Number','Model Number: Xbox Series X ',33),
    (66,'Additional Content','Additional Content: Series X console, One Wireless Controller, A high-speed HDMI Cable and Power Cable.',33),
    (67,'Series','Series : Dell IdeaCentre AIO 3 ',34),
    (68,'Specifications','Specifications :  (AMD Ryzen 3/8GB/1TB HDD/Windows 11/MS Office 2021/AMD Radeon Graphics/HD 720p Camera/Wired Keyboard, Mouse), Black (F0G6008AIN)',34),
    (69,'Series','Series : HP AIO ',35),
    (70,'Specifications',':  Specifications: 21.5 inch(54.6 cm) FHD Anti Glare Display (8GB/1TB HDD+256GB SSD/Win 11/Intel UHD Graphics/Wireless Keyboard & Mouse Combo/MS Office/Jet Black,22-dd2456in',35),
    (71,'Series','Series : HP AIO ',36),
    (72,'Specifications',' :Specifications :   27inches/68.6 cm 8GB RAM/512GB SSD/FHD, Micro-Edge, Anti-Glare Display/Wireless Keyboard & Mouse/Intel UHD Graphics/Windows 11/MSO 2021, 27-cb1345in',36),
    (73,'Series','Series : Dell Optiplex ',37),
    (74,'Specifications',' :Specifications :   Core i5 8 GB 500GB HDD Windows MS Office Intel HD Graphics), Black, RAM Size 8 GB, Memory Technology - DDR3, Computer Memory Type GDDR3, Maximum Memory Supported 8 GB, Hard Drive Size 500 GB, Hard Disk Description HDD',37),
    (75,'Series','Series : Dell Optiplex 19 ',38),
    (76,'Specifications',' :Specifications : (Intel i5 3470/8 GB/1TB HDD /19" HD Monitor+Keyboard+Mouse+ HD Webcam+Mic+Speakers+WiFi+Display Port/Windows 10 Pro/MS Office)',38),
    (77,'Series','Series : HP AIO',39),
    (78,'Specifications',' : VA, 3-Sided Micro-Edge, Anti-Glare/4GB RAM/1TB HDD/Wired Keyboard & Mouse/Dual Speakers/Win 11/Intel UHD Graphics/MSO 2021/5.7Kg, 22-dd2342in, White',39),
    (79,'Model','Model : M13',40),
    (80,'Specifications',' :Specifications : Aqua Green, 6GB, 128GB Storage | 6000mAh Battery | Upto 12GB RAM with RAM Plus, 6000mAh lithium-ion battery, 1 year manufacturer warranty for device and 6 months manufacturer warranty for in-box accessories including batteries from the date of purchase, Upto 12GB RAM with RAM Plus | 128GB internal memory expandable up to 1TB| Dual Sim (Nano), 50MP+5MP+2MP Triple camera setup- True 50MP (F1.8) main camera +5MP(F2.2)+ 2MP (F2.4) | 8MP (F2.2) front cam, Android 12,One UI Core 4 with a powerful Octa Core Processor, 16.72 centimeters (6.6-inch) FHD+ LCD - infinity O Display, FHD+ resolution with 1080 x 2408 pixels resolution, 401 PPI with 16M color',40),
    (81,'Model','Model : F13',41),
    (82,'Specifications',' :Specifications : (Nightsky Green, 4GB RAM 64GB Storage), 4 GB RAM | 64 GB ROM | Expandable Upto 1 TB, 16.76 cm (6.6 inch) Full HD+ Display, 50MP + 5MP + 2MP | 8MP Front Camera, 6000 mAh Lithium Ion Battery, Exynos 850 Processor',41),
    (83,'Model','Model : S20',42),
    (84,'Specifications',' :Specifications : Cloud Lavender, 8GB RAM, 128GB Storage, 5G Ready powered by Qualcomm Snapdragon 865 Octa-Core processor, 8GB RAM, 128GB internal memory expandable up to 1TB, Android 11.0 operating system and dual SIM, Triple Rear Camera Setup - 12MP (Dual Pixel) OIS F1.8 Wide Rear Camera + 8MP OIS Tele Camera + 12MP Ultra Wide | 30X Space Zoom, Single Take & Night Mode | 32MP F2.2 Front Punch Hole Camera 6.5-inch(16.40 centimeters) Infinity-O Super AMOLED Display with 120Hz Refresh rate, 1080 x 2400 (FHD+) Resolution " 4500 mAh battery (Non -removable) with Super Fast Charging, FAst Wireless Charging & Finger Print sensor',42),
    (85,'Series','Series : D-Series',43),
    (86,'Specifications',' :Specifications :  |16.7 Mn Colors, 3000:1 Contrast Ratio, 75Hz, 4ms, AMD FreeSync, HDMI, VESA Wall Mount, TUV Eye Comfort & Low Blue Light -D22e-20',43),
    (87,'Series','Series : VA2432-MH ',44),
    (88,'Specifications',' :Specifications :  IPS Panel, 1920 x 1080 Full HD Pixels Display, Super Clear IPS Technology, 75 Hz Refresh Rate, 3 Side Borderless Design, Dual Integrated Speakers, HDMI | VGA Enabled',44),
    (89,'Series','Series : LF24T350FHWXXL ',45),
    (90,'Specifications',' :Specifications : IPS, 75 Hz, Bezel Less Design, AMD FreeSync, Flicker Free, HDMI, D-sub, Dark Blue Gray), 24 inch Samsung Monitor - 1,920 x 1,080 Resolution IPS Panel Monitor 3-sided borderless display for All-expansive view, Fluid pictures with 75hz refresh rate | 5 ms response time | 250cd/m2 Brightness (Typical)',45),
    (91,'Series','Series : EK220Q ',46),
    (92,'Specifications',' :Specifications : 250 Nits HDMI and VGA Ports Eye Care Features Like Bluelight Shield, Flickerless and Comfy View (1920 x 1080 Pixels, Black), 21.5 Inch VA Panel Full HD 1920 X 1080 Resolution Monitor I 250 Nits Brightness I 178 / 178 View Angle, Connectivity Options : HDMI and VGA Ports with Inbox HDMI Cable, 5MS Response Time 75Hz Fast Refresh Rate, Eye Care Featues Includes Bluelight Shield I Flickerless I Comfyview, Wall Mount Ready I -5 to -20 Tilt Adjustment',46),
    (93,'Series','Series : Ha220Q',47),
    (94,'Specifications',' :Specifications : 1920 X 1080 Pixels Full Hd IPS Ultra Slim (6.6Mm Thick) Monitor I Frameless Design I AMD Free Sync I Eye Care Features I Stereo Speakers (White), Exceptional Full HD IPS 21.5 Inch Ultra Thin Display : Enjoy immaculate image quality with 1920x1080 resolution and 178 degree wide viewing angles, Connectivity Ports : 1 VGA Port, 1 HDMI, 1 Audio-In Port, Inbox HDMI and VGA Cable, Eye Care Features Includes Blue Light Shield, Flickerless, Comfyview helps to protect the eyes and gives comfortable viewing experience, 250 Nits Brightness, 4MS Response Time 75Hz Refresh Rate with AMD Free Sync Technology',47),
    (95,'Series','Series : HA270',48),
    (96,'Specifications',' :Specifications : 6.6mm Thick Frameless Design AMD Free Sync LCD Monitor with Eye Care Features and Stereo Speakers (White), Exceptional Full HD IPS 27 Inch Ultra Thin Display : Enjoy immaculate image quality with 1920x1080 resolution and 178 degree wide viewing angles, Connectivity Ports : 1 VGA Port, 1 HDMI, 1 Audio-In Port, Inbox HDMI and VGA Cable, Eye Care Features Includes Blue Light Shield, Flickerless, Comfyview helps to protect the eyes and gives comfortable viewing experience, 250 Nits Brightness, 4MS Response Time 75Hz Refresh Rate with AMD Free Sync Technology',48),
    (97,'Series','Series : Zeb-V16HD',49),
    (98,'Specifications',' :Specifications : 15.4 with Supporting HDMI, has VGA Input, HD 1280 x 800, Glossy Panel, Slim Feature and Wall mountable, VGA / HDMI input.Aspect ratio 16:10. Viewing angle H90/V50, Slim design, Anti glare, Built-in power supply',49),
    (99,'Series','Series :  Zeb-V19HD',50),
    (100,'Specifications',' :Specifications : Supporting Hdmi, Vga Input, Hd 1366 X 768 Pixels, 16.7M Colors, Glossy Panel, Slim Design & Wall Mountable, Black, HD 1366 x 768 Native resolution with 16:9 Aspect Ratio, Supports 16.7 Million Colors.High quality 220cd/m² Maximum Brightness Dynamic Contrast Ratio 500000:1, Viewing Angle H170°/ V160°, 8ms Response Time & 0.3 x 0.3 mm Pixel Pitch Green',50)
  

DROP TABLE IF EXISTS Tags

CREATE TABLE Tags
(
    Id int NOT NULL,
    Value nvarchar(255) NULL,
    CONSTRAINT PK_Tags PRIMARY KEY(Id)
)

INSERT INTO Tags
VALUES
    (1, 'RechargeableScrewdriver'),
    (2, 'Multitool'),
    (3, 'HardHat')

DROP TABLE IF EXISTS Types

CREATE TABLE Types
(
    Id int NOT NULL,
    Code nvarchar(255) NULL,
    Name nvarchar(255) NULL,
    CONSTRAINT PK_Types PRIMARY KEY(Id)
)

INSERT INTO Types
VALUES
    (1, 'controllers' , 'Controllers'),
    (2, 'laptops' , 'Laptops'),
    (3, 'desktops' , 'Desktops'),
    (4, 'mobiles' , 'Mobiles'),
    (5, 'monitors' , 'Monitors')  
 

DROP TABLE IF EXISTS Products

CREATE TABLE Products
(
    Id int NOT NULL,
    Name nvarchar(255) NULL,
    Price decimal(9, 2) NULL,
    ImageName nvarchar(255) NULL,
    BrandId int NULL,
    TypeId int NULL,
    TagId int NULL,
    CONSTRAINT PK_Products PRIMARY KEY(Id)
)

INSERT INTO Products (Id,Name,Price,ImageName,BrandId,TypeId,TagId)
VALUES
    (1,'Xbox Wireless Controller Lunar Shift Special Edition',99,'PID1-1.jpg',1,1,NULL),
    (2,'Xbox Wireless Controller Mineral Camo Special Edition',112,'PID2-1.jpg',1,1,NULL),
    (3,'Xbox Elite Wireless Controller Series 2 Core (White)',139,'PID3-1.jpg',1,1,NULL),
    (4,'Xbox Wireless Controller 20th Anniversary Special Edition',89,'PID4-1.jpg',1,1,NULL),
    (5,'Xbox Elite Wireless Controller Series 2 Halo Infinite Limited Edition',139,'PID5-1.jpg',1,1,NULL),
    (6,'Microsoft Surface Pro 7 PUV-00028 12.3" Black',249,'PID6-1.jpg',1,2,NULL),
    (7,'Microsoft Surface Laptop 4 AMD Ryzen 5 4680U 13.5 inches',299,'PID7-1.jpg',1,2,NULL),
    (8,'Microsoft Surface Pro X 1876 13 Inches Laptop',699,'PID8-1.jpg',1,2,NULL),
    (9,'Microsoft Surface GO 2 STQ-00013 10.1" (26.54 cms) Laptop',549,'PID9-1.jpg',1,2,NULL),
    (10,'Microsoft Surface Laptop 3 Intel Core i5 10th Gen 13.5" (34.29 cms) Touchscreen Laptop',349,'PID10-1.jpg',1,2,NULL),
    (11,'ASUS VivoBook 15 (2021), 15.6-inch (39.62 cm) HD, Dual Core Intel Celeron N4020, Thin and Light Laptop',429,'PID11-1.jpg',2,2,NULL),
    (12,'ASUS Vivobook S15 OLED 2022, 15.6" 39.62 cm FHD OLED Laptop',899,'PID12-1.jpg',2,2,NULL),
    (13,'ASUS TUF Gaming F15 (2021), 15.6" (39.62 cms) FHD 144Hz Laptop',1299,'PID13-1.jpg',2,2,NULL),
    (14,'ASUS TUF Gaming A15, 15.6" (39.62 cms) FHD 144Hz Laptop',1199,'PID14-1.jpg',2,2,NULL),
    (15,'ASUS Vivobook 14 OLED, 12th Gen Intel Core i3-1215U Laptop',1099,'PID15-1.jpg',2,2,NULL),
    (16,'Dell 24" All-in-One 5410 Core I3 12th Gen desktop',1199,'PID16-1.jpg',3,3,NULL),
    (17,'Dell Optiplex 380 17 inch (43.18 cms) Desktop',1399,'PID17-1.jpg',3,3,NULL),
    (18,'Dell Optiplex 19 inch, All in One Desktop Set',899,'PID18-1.jpg',3,3,NULL),
    (19,'Acer EK220Q 54.61 cm Full HD VA Panel Backlit LED Monitor',899,'PID19-1.jpg',4,5,NULL),
    (20,'Acer Ha220Q 21.5 Inch (54.61 cm) LCD Monitor',899,'PID20-1.jpg',4,5,NULL),
    (21,'Acer Aspire C24 23.8 inch Full HD IPS All in One Desktop',1399,'PID21-1.jpg',4,3,NULL),
    (22,'ASUS ROG Phone 2',699,'PID22-1.jpg',2,4,NULL),
    (23,'Asus Zenfone 5Z ',699,'PID23-1.jpg',2,4,NULL),
    (24,'ASUS 6Z',859,'PID24-1.jpg',2,4,NULL),
    (25,'OnePlus Nord CE 2 Lite',679,'PID25-1.jpg',5,4,NULL),
    (26,'OnePlus Nord 2T ',578,'PID26-1.jpg',5,4,NULL),
    (27,'OnePlus 10R',999,'PID27-1.jpg',5,4,NULL),
    (28,'OnePlus 10T',999,'PID28-1.jpg',5,4,NULL),
    (29,'Xbox Wireless Controller Forza Horizon 5 Limited Edition',299,'PID29-1.jpg',1,1,NULL),
    (30,'Xbox Wireless Controller Aqua Shift Special Edition',299,'PID30-1.jpg',1,1,NULL),
    (31,'Xbox Wireless Controller Daystrike Camo Special Edition',299,'PID31-1.jpg',1,1,NULL),
    (32,'Xbox Wireless Controller Black',299,'PID32-1.jpg',1,1,NULL),
    (33,'Xbox Wireless Controller White',299,'PID33-1.jpg',1,1,NULL),
    (34,'Lenovo IdeaCentre AIO 3 21.5 inches Full HD IPS All-in-One Desktop',899,'PID34-1.jpg',7,3,NULL),
    (35,'HP AIO PC 12th Gen Intel Core i3-1215U desktop',899,'PID35-1.jpg',6,3,NULL),
    (36,'HP All-in-One 12th Gen Intel Core i3 desktop',899,'PID36-1.jpg',6,3,NULL),
    (37,'Dell Optiplex Desktop',899,'PID37-1.jpg',3,3,NULL),
    (38,'Dell Optiplex 19" All-in-One Desktop Computer Set',899,'PID38-1.jpg',3,3,NULL),
    (39,'HP AIO Intel Celeron J4025-54.6cm(21.5 inch) FHD desktop',899,'PID39-1.jpg',6,3,NULL),
    (40,'Samsung Galaxy M13',999,'PID40-1.jpg',8,4,NULL),
    (41,'SAMSUNG Galaxy F13',999,'PID41-1.jpg',8,4,NULL),
    (42,'Samsung Galaxy S20 FE 5G',1899,'PID42-1.jpg',8,4,NULL),
    (43,'Lenovo D-Series 54.61 cm (22 inch) FHD VA 3-Side NearEdgeless Monitor',799,'PID43-1.jpg',7,5,NULL),
    (44,'ViewSonic VA2432-MH 23.8 inches Monitor',799,'PID44-1.jpg',9,5,NULL),
    (45,'Samsung 24-inch(60.46cm) FHD Monitor',799,'PID45-1.jpg',8,5,NULL),
    (46,'Acer EK220Q 54.61 cm Full HD VA Panel Backlit LED Monitor',799,'PID46-1.jpg',4,5,NULL),
    (47,'Acer Ha220Q 21.5 Inch (54.61 Cm) LCD Monitor',799,'PID47-1.jpg',4,5,NULL),
    (48,'Acer HA270 27 Inch (68.58 cm) Full HD 1920 x 1080 IPS Ultra Slim Monitor',799,'PID48-1.jpg',4,5,NULL),
    (49,'Zebronics Zeb-V16HD LED Monitor',799,'PID49-1.jpg',10,5,NULL),
    (50,'ZEBRONICS Zeb-V19Hd 18.5 Inch (46.99 Cm) Led Monitor',799,'PID50-1.jpg',10,5,NULL)
