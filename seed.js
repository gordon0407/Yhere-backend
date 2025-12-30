const mongoose = require('mongoose');

// ====== 1. 連接 MongoDB ======
mongoose.connect("mongodb+srv://hokachungordon60191864_db_user:PZLJ2loJ7vsK9jid@yhere.jexacu7.mongodb.net/")
  .then(() => console.log("MongoDB 已連接"))
  .catch(err => console.log("MongoDB 連接失敗", err));

// ====== 2. 建立 Schema ======
const SpotSchema = new mongoose.Schema({
  country: String,
  name: String,
  city: String,
  lat: Number,
  lng: Number,
  thumbnail: String,
  description: String,
  history: String,
  products: Array
});

const Spot = mongoose.model("Spot", SpotSchema);

// ====== 3. 香港景點資料 ======
const hkSpots = [
  {
    country: "HK",
    name: "太平山頂",
    city: "香港島",
    lat: 22.2758,
    lng: 114.1455,
    thumbnail: "https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg",
    description: "香港最著名的觀景點，可俯瞰維港景色。",
    history: "太平山頂在殖民時期已經是高級住宅區，後來發展成為遊客必到景點，凌霄閣和山頂纜車都是人氣設施。",
    products: [
      { name: "山頂纜車來回票", provider: "Klook", url: "https://www.klook.com/" },
      { name: "山頂蠟像館套票", provider: "KKday", url: "https://www.kkday.com/" }
    ]
  },
  {
    country: "HK",
    name: "星光大道",
    city: "尖沙咀",
    lat: 22.2950,
    lng: 114.1733,
    thumbnail: "https://images.pexels.com/photos/3586966/pexels-photo-3586966.jpeg",
    description: "沿海濱長廊欣賞維港夜景，並有多位明星手印。",
    history: "星光大道仿效荷里活星光大道而設，展示香港電影業歷史與明星成就。",
    products: [
      { name: "幻彩詠香江遊船", provider: "Klook", url: "https://www.klook.com/" }
    ]
  },
  {
    country: "HK",
    name: "天壇大佛",
    city: "大嶼山",
    lat: 22.2530,
    lng: 113.9048,
    thumbnail: "https://images.pexels.com/photos/2184803/pexels-photo-2184803.jpeg",
    description: "位於大嶼山昂坪的巨型青銅佛像，是香港地標之一。",
    history: "天壇大佛於 1993 年落成，是全球最大的戶外青銅座佛之一。",
    products: [
      { name: "昂坪 360 纜車套票", provider: "KKday", url: "https://www.kkday.com/" }
    ]
  }
];

// ====== 4. 寫入資料 ======
async function seed() {
  try {
    await Spot.deleteMany({ country: "HK" }); // 清除舊資料
    await Spot.insertMany(hkSpots);
    console.log("香港景點已成功寫入 MongoDB！");
  } catch (err) {
    console.log("寫入失敗：", err);
  } finally {
    mongoose.connection.close();
  }
}

seed();
