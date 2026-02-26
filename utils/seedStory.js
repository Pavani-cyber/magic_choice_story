const mongoose = require("mongoose");
const Story = require("../models/story");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));
//unsplash images
const u = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

async function seed() {
  await Story.deleteMany();

  const stories = [
//1
    {
      title: "Monkey Magic Jungle",
      description: "Milo explores a glowing jungle full of surprises.",
      coverImage: "https://res.cloudinary.com/detq8ltdi/image/upload/v1772028109/monkey1_eizvhp.jpg",
      ageGroup: "5-8 years",
      pages: [
        {pageNumber:1,text:"Milo the monkey woke up to golden sunlight in the jungle.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772028185/monkey2_xx5fby.jpg",question:"Climb the tallest tree?",yesNext:2,noNext:3},
        {pageNumber:2,text:"From the top he saw a glowing forest far away.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772028185/monkey2_xx5fby.jpg",question:"Jump toward the glow?",yesNext:4,noNext:5},
        {pageNumber:3,text:"He stayed near home eating bananas happily.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772028252/monkey4_ej8tmc.jpg"},
        {pageNumber:4,text:"Butterflies guided Milo deeper into the forest.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772028296/monkey5_i5jfdt.jpg",question:"Follow them?",yesNext:6,noNext:5},
        {pageNumber:5,text:"He heard a river flowing softly.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772028330/monkey6_aywvyz.jpg",question:"Cross the river?",yesNext:6,noNext:7},
        {pageNumber:6,text:"A magic fruit gave Milo super jumping powers!",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772028371/monkey7_fx3mme.jpg"},
        {pageNumber:7,text:"He leaped across trees like a superhero.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772028409/monkey8_cimn57.jpg"},
        {pageNumber:8,text:"Suddenly a baby bird needed help.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772028441/monkey9_btlyex.jpg",question:"Help the bird?",yesNext:9,noNext:10},
        {pageNumber:9,text:"The bird thanked him with a shiny feather.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772028479/monkey9_irlswx.jpg"},
        {pageNumber:10,text:"Rain started pouring heavily.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772028522/monkey10_wqftlv.jpg",question:"Hide in cave?",yesNext:11,noNext:12},
        {pageNumber:11,text:"Inside the cave he found sparkling crystals.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772028558/monkey11_ln0ads.jpg"},
        {pageNumber:12,text:"At sunset Milo returned home smiling after a magical day.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772028185/monkey2_xx5fby.jpg"}
      ]
    },
//2
    {
      title:"Pirate Treasure Hunt",
      description:"Sail the sea and search for hidden treasure.",
      coverImage:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772029225/pri1_loyxny.jpg",
      ageGroup:"6-10 years",
      pages:[
        {pageNumber:1,text:"Captain Leo sailed across the bright blue sea.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772029239/pri2_qqbxyk.jpg",question:"Check the treasure map?",yesNext:2,noNext:3},
        {pageNumber:2,text:"The map pointed to Skull Island.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772029252/pri3_pphgkn.jpg",question:"Sail there?",yesNext:4,noNext:5},
        {pageNumber:3,text:"They relaxed on deck watching dolphins.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772029266/pri4_xj7thv.jpg"},
        {pageNumber:4,text:"Palm trees welcomed the crew.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772029282/pri5_okv5d7.jpg",question:"Search jungle?",yesNext:6,noNext:7},
        {pageNumber:5,text:"Storm clouds gathered.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772070214/pri6_u3vysn.jpg"},
        {pageNumber:6,text:"They found an old wooden chest.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772070227/pri7_yaixok.jpg",question:"Open it?",yesNext:8,noNext:7},
        {pageNumber:7,text:"They built a sandcastle and played games.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772070242/pri8_b7ebsm.jpg"},
        {pageNumber:8,text:"Gold coins sparkled brightly.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772070256/pri9_e5yb5a.jpg"},
        {pageNumber:9,text:"A parrot shouted 'Danger!'",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772070269/pri10_rsc9yk.jpg",question:"Run or stay?",yesNext:10,noNext:11},
        {pageNumber:10,text:"They escaped a rolling boulder trap.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772070283/pri11_fbyjmy.jpg"},
        {pageNumber:11,text:"They celebrated with music and dance.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772070194/pri12_iwvszv.jpg"},
        {pageNumber:12,text:"Leo became the bravest pirate captain ever.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772029239/pri2_qqbxyk.jpg"}
      ]
    },
//3
    {
      title:"Ocean Explorer",
      description:"Discover life under the sea.",
      coverImage:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772071133/oc1_bqzxwr.jpg",
      ageGroup:"6-10 years",
      pages:[
        {pageNumber:1,text:"You dive into the ocean. A school of fish swims by.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772071143/oc2_gwogke.jpg",question:"Follow the fish?",yesNext:2,noNext:3},
        {pageNumber:2,text:"You swim alongside the colorful fish and discover a hidden coral reef.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772071153/oc3_by5r3h.jpg",question:"Explore the coral reef?",yesNext:4,noNext:5},
        {pageNumber:3,text:"You stay close to the surface and admire the waves.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772071153/oc3_by5r3h.jpg",question:"Dive deeper later?",yesNext:2,noNext:6},
        {pageNumber:4,text:"Tiny crabs scuttle around the corals. You carefully observe them.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772071164/oc4_tf46tg.jpg",question:"Touch the corals?",yesNext:7,noNext:5},
        {pageNumber:5,text:"You swim past the reef, heading toward a sea cave.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772071178/oc5_vwlxer.jpg",question:"Enter the sea cave?",yesNext:8,noNext:6},
        {pageNumber:6,text:"You linger a little longer, exploring every corner of the ocean before surfacing.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772071197/oc6_nkgxtr.jpg"},
        {pageNumber:7,text:"The turtle leads you through a beautiful underwater canyon.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772071237/oc7_licde9.jpg",question:"Explore the canyon further?",yesNext:9,noNext:6},
        {pageNumber:8,text:"Inside the chest, you find shiny pearls and a map to more treasures!",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772071249/oc8_xyvykp.jpg",question:"Follow the treasure map?",yesNext:10,noNext:6},
        {pageNumber:9,text:"You swim back to the surface, feeling happy from the adventure.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772071260/oc9_xhstoj.jpg"},
        {pageNumber:10,text:"You linger a little longer, exploring every corner of the ocean before surfacing.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772071260/oc9_xhstoj.jpg"}
      ]
    },
//4
{
  title:"Space Star Adventure",
  description:"A rocket journey through the stars.",
  coverImage:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772072019/sp1_scv65g.jpg",
  ageGroup:"7-12 years",
  pages:[
    {pageNumber:1,text:"Arjun prepared his shiny rocket for launch.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772072034/sp2_d640ni.jpg",question:"Start countdown?",yesNext:2,noNext:3},
    {pageNumber:2,text:"The rocket blasted into the sky with a loud roar.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772072034/sp2_d640ni.jpg",question:"Fly to the Moon?",yesNext:4,noNext:5},
    {pageNumber:3,text:"He double-checked the controls and fixed a loose wire.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772072048/sp3_smbans.jpg",question:"Try launch again?",yesNext:2,noNext:6},
    {pageNumber:4,text:"He bounced happily on the Moon’s low gravity.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772072060/sp4_ay5k13.jpg",question:"Explore craters?",yesNext:7,noNext:5},
    {pageNumber:5,text:"He steered toward a field of glowing asteroids.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772072088/sp6_m3mumn.jpg",question:"Collect samples?",yesNext:8,noNext:6},
    {pageNumber:6,text:"Fuel ran low, so he safely returned toward Earth.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772072088/sp6_m3mumn.jpg"},
    {pageNumber:7,text:"He discovered sparkling space rocks and took photos.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772072214/sp7_zzi3z8.jpg",question:"Visit alien base?",yesNext:9,noNext:6},
    {pageNumber:8,text:"A meteor shower lit up the sky like fireworks.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772072214/sp7_zzi3z8.jpg",question:"Watch closely?",yesNext:9,noNext:6},
    {pageNumber:9,text:"Friendly tiny aliens waved hello.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772072240/sp8_pptaew.jpg",question:"Wave back?",yesNext:10,noNext:6},
    {pageNumber:10,text:"They gifted him a glowing star crystal.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772072259/sp9_pxr4gc.jpg"}
  ]
},
//5
{
  title:"Dinosaur Valley",
  description:"Travel back to dinosaur times.",
  coverImage:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772073235/di1_exrrea.jpg",
  ageGroup:"6-10 years",
  pages:[
    {pageNumber:1,text:"You step through a time portal into Dinosaur Valley.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772073365/di2_d6jvjy.jpg",question:"Approach baby dinos?",yesNext:2,noNext:3},
    {pageNumber:2,text:"The baby dinosaurs happily play around you.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772073383/di3_th82nm.jpg",question:"Follow them?",yesNext:4,noNext:5},
    {pageNumber:3,text:"You explore alone through giant ferns.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772073383/di3_th82nm.jpg",question:"Look for river?",yesNext:5,noNext:6},
    {pageNumber:4,text:"A huge T-Rex appears far away.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772073235/di1_exrrea.jpg",question:"Hide?",yesNext:7,noNext:5},
    {pageNumber:5,text:"You find dinosaur footprints in the mud.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772073398/di4_r05suc.jpg",question:"Follow prints?",yesNext:7,noNext:6},
    {pageNumber:6,text:"The sun sets and you return safely through the portal.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772073413/di5_ivcwzb.jpg"},
    {pageNumber:7,text:"You discover a nest of colorful dinosaur eggs.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772073430/di6_dggvtm.jpg",question:"Observe quietly?",yesNext:8,noNext:6},
    {pageNumber:8,text:"The mother dinosaur nods kindly and walks away.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772073235/di1_exrrea.jpg"}
  ]
},
//6
{
  title:"Magic Tree Secret",
  description:"A talking tree shares ancient wisdom.",
  coverImage:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772073898/tr1_npvutw.jpg",
  ageGroup:"6-10 years",
  pages:[
    {pageNumber:1,text:"A glowing tree stands in the quiet forest.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772073916/tr2_vmjwvw.jpg",question:"Approach it?",yesNext:2,noNext:3},
    {pageNumber:2,text:"The tree speaks gently and tells a story.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772073942/tr3_sdbcew.jpg",question:"Listen carefully?",yesNext:4,noNext:5},
    {pageNumber:3,text:"You explore the forest path instead.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772073960/tr4_deleku.jpg",question:"Return to tree later?",yesNext:2,noNext:6},
    {pageNumber:4,text:"A small door opens in the trunk.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772073978/tr5_ldbycu.jpg",question:"Open it?",yesNext:7,noNext:5},
    {pageNumber:5,text:"Fireflies glow around the roots peacefully.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772074006/tr6_ldye3f.jpg",question:"Stay longer?",yesNext:7,noNext:6},
    {pageNumber:6,text:"You walk home with calm thoughts.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772074026/tr7_nt3y59.jpg"},
    {pageNumber:7,text:"Inside are floating magical books and lights.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772074026/tr7_nt3y59.jpg",question:"Take glowing seed?",yesNext:8,noNext:6},
    {pageNumber:8,text:"You plant the seed and promise to protect the forest.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772074046/tr8_nm5phy.jpg"}
  ]
},
//7
{
  title:"Robot City Rescue",
  description:"Fix a broken robot city.",
  coverImage:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772074537/rb1_ycfr7m.jpg",
  ageGroup:"7-12 years",
  pages:[
    {pageNumber:1,text:"Robot City lights flicker and machines stop.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772074561/rb2_pikeof.jpg",question:"Investigate?",yesNext:2,noNext:3},
    {pageNumber:2,text:"A small robot asks for help fixing wires.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772074601/rb4_e6rxdc.jpg",question:"Repair it?",yesNext:4,noNext:5},
    {pageNumber:3,text:"You watch carefully from a safe spot.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772074618/rb5_qif29a.jpg",question:"Help later?",yesNext:2,noNext:6},
    {pageNumber:4,text:"The robot beeps happily and guides you to the control tower.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772074618/rb5_qif29a.jpg",question:"Enter tower?",yesNext:7,noNext:5},
    {pageNumber:5,text:"Conveyor belts jam and sparks fly.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772074581/rb3_ucoaqr.jpg",question:"Fix belts?",yesNext:7,noNext:6},
    {pageNumber:6,text:"The city slowly shuts down for the night.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772074637/rb6_filyog.jpg"},
    {pageNumber:7,text:"You reconnect the power core and lights glow again.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772074656/rb7_tvrlyx.jpg",question:"Celebrate?",yesNext:8,noNext:6},
    {pageNumber:8,text:"All robots cheer and thank you for saving the city.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772074674/rb8_wgqcuq.jpg"}
  ]
},
//8
{
  title:"Flying Kite Dream",
  description:"A magical kite takes you to the sky.",
  coverImage:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772075196/kt1_uzmk3e.jpg",
  ageGroup:"5-8 years",
  pages:[
    {pageNumber:1,text:"You find a colorful kite on a windy hill.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772075214/kt2_kyyx8x.jpg",question:"Hold it tight?",yesNext:2,noNext:3},
    {pageNumber:2,text:"The kite lifts you gently into the sky.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772075231/kt3_i1rbof.jpg",question:"Fly higher?",yesNext:4,noNext:5},
    {pageNumber:3,text:"You watch the clouds from the ground.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772075249/kt4_rptqex.jpg",question:"Try again later?",yesNext:2,noNext:6},
    {pageNumber:4,text:"You soar above hills and rivers.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772075268/kt5_drnhhn.jpg",question:"Follow rainbow?",yesNext:7,noNext:5},
    {pageNumber:5,text:"Birds fly beside you happily.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772075287/kt6_mimqiv.jpg",question:"Race them?",yesNext:7,noNext:6},
    {pageNumber:6,text:"The kite lands softly back on the grass.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772075305/kt7_at4ufy.jpg"},
    {pageNumber:7,text:"The sunset paints the sky orange and pink.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772075327/kt8_cvnbic.jpg",question:"Stay longer?",yesNext:8,noNext:6},
    {pageNumber:8,text:"You land smiling after a magical flying adventure.",image:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772075346/kt9_coayjc.jpg"}
  ]
}
  ];

  await Story.insertMany(stories);

  console.log("✅ 8 stories with stable Unsplash images added!");
  process.exit();
}

seed();