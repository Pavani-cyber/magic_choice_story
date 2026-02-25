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
      coverImage: u("1520962922320-2038eebab146"),
      ageGroup: "5-8 years",
      pages: [
        {pageNumber:1,text:"Milo the monkey woke up to golden sunlight in the jungle.",image:u("1501706362039-c6b2a7a1d0f2"),question:"Climb the tallest tree?",yesNext:2,noNext:3},
        {pageNumber:2,text:"From the top he saw a glowing forest far away.",image:u("1500530855697-b586d89ba3ee"),question:"Jump toward the glow?",yesNext:4,noNext:5},
        {pageNumber:3,text:"He stayed near home eating bananas happily.",image:u("1528825871115-3581a5387919")},
        {pageNumber:4,text:"Butterflies guided Milo deeper into the forest.",image:u("1470770903676-69b98201ea1c"),question:"Follow them?",yesNext:6,noNext:5},
        {pageNumber:5,text:"He heard a river flowing softly.",image:u("1502082553048-f009c37129b9"),question:"Cross the river?",yesNext:6,noNext:7},
        {pageNumber:6,text:"A magic fruit gave Milo super jumping powers!",image:u("1501004318641-b39e6451bec6")},
        {pageNumber:7,text:"He leaped across trees like a superhero.",image:u("1501785888041-af3ef285b470")},
        {pageNumber:8,text:"Suddenly a baby bird needed help.",image:u("1444464666168-49d633b86797"),question:"Help the bird?",yesNext:9,noNext:10},
        {pageNumber:9,text:"The bird thanked him with a shiny feather.",image:u("1500534314209-a25ddb2bd429")},
        {pageNumber:10,text:"Rain started pouring heavily.",image:u("1500375592092-40eb2168fd21"),question:"Hide in cave?",yesNext:11,noNext:12},
        {pageNumber:11,text:"Inside the cave he found sparkling crystals.",image:u("1519681393784-d120267933ba")},
        {pageNumber:12,text:"At sunset Milo returned home smiling after a magical day.",image:u("1472214103451-9374bd1c798e")}
      ]
    },

    /* ======================================================
       STORY 2 — Pirate Treasure Hunt
    ====================================================== */
    {
      title:"Pirate Treasure Hunt",
      description:"Sail the sea and search for hidden treasure.",
      coverImage:u("1507525428034-b723cf961d3e"),
      ageGroup:"6-10 years",
      pages:[
        {pageNumber:1,text:"Captain Leo sailed across the bright blue sea.",image:u("1500375592092-40eb2168fd21"),question:"Check the treasure map?",yesNext:2,noNext:3},
        {pageNumber:2,text:"The map pointed to Skull Island.",image:u("1500534314209-a25ddb2bd429"),question:"Sail there?",yesNext:4,noNext:5},
        {pageNumber:3,text:"They relaxed on deck watching dolphins.",image:u("1474511320723-9a56873867b5")},
        {pageNumber:4,text:"Palm trees welcomed the crew.",image:u("1501594907352-04cda38ebc29"),question:"Search jungle?",yesNext:6,noNext:7},
        {pageNumber:5,text:"Storm clouds gathered.",image:u("1502082553048-f009c37129b9")},
        {pageNumber:6,text:"They found an old wooden chest.",image:u("1526045612212-70caf35c14df"),question:"Open it?",yesNext:8,noNext:7},
        {pageNumber:7,text:"They built a sandcastle and played games.",image:u("1507525428034-b723cf961d3e")},
        {pageNumber:8,text:"Gold coins sparkled brightly.",image:u("1518546305927-5a555bb7020d")},
        {pageNumber:9,text:"A parrot shouted 'Danger!'",image:u("1500530855697-b586d89ba3ee"),question:"Run or stay?",yesNext:10,noNext:11},
        {pageNumber:10,text:"They escaped a rolling boulder trap.",image:u("1472214103451-9374bd1c798e")},
        {pageNumber:11,text:"They celebrated with music and dance.",image:u("1492724441997-5dc865305da7")},
        {pageNumber:12,text:"Leo became the bravest pirate captain ever.",image:u("1500534314209-a25ddb2bd429")}
      ]
    },

    /* ======================================================
       STORY 3 — Ocean Explorer
    ====================================================== */
    {
      title:"Ocean Explorer",
      description:"Discover life under the sea.",
      coverImage:u("1507525428034-b723cf961d3e"),
      ageGroup:"6-10 years",
      pages:[
        {pageNumber:1,text:"You dive into the ocean. A school of fish swims by.",image:u("1501594907352-04cda38ebc29"),question:"Follow the fish?",yesNext:2,noNext:3},
        {pageNumber:2,text:"You swim alongside the colorful fish and discover a hidden coral reef.",image:u("1504384308090-c894fdcc538d"),question:"Explore the coral reef?",yesNext:4,noNext:5},
        {pageNumber:3,text:"You stay close to the surface and admire the waves.",image:u("1500530855697-b586d89ba3ee"),question:"Dive deeper later?",yesNext:2,noNext:6},
        {pageNumber:4,text:"Tiny crabs scuttle around the corals. You carefully observe them.",image:u("1465101046530-73398c7f28ca"),question:"Touch the corals?",yesNext:7,noNext:5},
        {pageNumber:5,text:"You swim past the reef, heading toward a sea cave.",image:u("1504384308090-c894fdcc538d"),question:"Enter the sea cave?",yesNext:8,noNext:6},
        {pageNumber:6,text:"You linger a little longer, exploring every corner of the ocean before surfacing.",image:u("1504384308090-c894fdcc538d")},
        {pageNumber:7,text:"The turtle leads you through a beautiful underwater canyon.",image:u("1504384308090-c894fdcc538d"),question:"Explore the canyon further?",yesNext:9,noNext:6},
        {pageNumber:8,text:"Inside the chest, you find shiny pearls and a map to more treasures!",image:u("1500530855697-b586d89ba3ee"),question:"Follow the treasure map?",yesNext:10,noNext:6},
        {pageNumber:9,text:"You swim back to the surface, feeling happy from the adventure.",image:u("1507525428034-b723cf961d3e")},
        {pageNumber:10,text:"You linger a little longer, exploring every corner of the ocean before surfacing.",image:u("1504384308090-c894fdcc538d")}
      ]
    },
//4
{
  title:"Space Star Adventure",
  description:"A rocket journey through the stars.",
  coverImage:u("1446776811953-b23d57bd21aa"),
  ageGroup:"7-12 years",
  pages:[
    {pageNumber:1,text:"Arjun prepared his shiny rocket for launch.",image:u("1446776811953-b23d57bd21aa"),question:"Start countdown?",yesNext:2,noNext:3},
    {pageNumber:2,text:"The rocket blasted into the sky with a loud roar.",image:u("1506744038136-46273834b3fb"),question:"Fly to the Moon?",yesNext:4,noNext:5},
    {pageNumber:3,text:"He double-checked the controls and fixed a loose wire.",image:u("1462331940025-496dfbfc7564"),question:"Try launch again?",yesNext:2,noNext:6},
    {pageNumber:4,text:"He bounced happily on the Moon’s low gravity.",image:u("1500530855697-b586d89ba3ee"),question:"Explore craters?",yesNext:7,noNext:5},
    {pageNumber:5,text:"He steered toward a field of glowing asteroids.",image:u("1504384308090-c894fdcc538d"),question:"Collect samples?",yesNext:8,noNext:6},
    {pageNumber:6,text:"Fuel ran low, so he safely returned toward Earth.",image:u("1462331940025-496dfbfc7564")},
    {pageNumber:7,text:"He discovered sparkling space rocks and took photos.",image:u("1507525428034-b723cf961d3e"),question:"Visit alien base?",yesNext:9,noNext:6},
    {pageNumber:8,text:"A meteor shower lit up the sky like fireworks.",image:u("1504384308090-c894fdcc538d"),question:"Watch closely?",yesNext:9,noNext:6},
    {pageNumber:9,text:"Friendly tiny aliens waved hello.",image:u("1500534314209-a25ddb2bd429"),question:"Wave back?",yesNext:10,noNext:6},
    {pageNumber:10,text:"They gifted him a glowing star crystal.",image:u("1506744038136-46273834b3fb")}
  ]
},
//5
{
  title:"Dinosaur Valley",
  description:"Travel back to dinosaur times.",
  coverImage:u("1465101046530-73398c7f28ca"),
  ageGroup:"6-10 years",
  pages:[
    {pageNumber:1,text:"You step through a time portal into Dinosaur Valley.",image:u("1465101046530-73398c7f28ca"),question:"Approach baby dinos?",yesNext:2,noNext:3},
    {pageNumber:2,text:"The baby dinosaurs happily play around you.",image:u("1500534314209-a25ddb2bd429"),question:"Follow them?",yesNext:4,noNext:5},
    {pageNumber:3,text:"You explore alone through giant ferns.",image:u("1507525428034-b723cf961d3e"),question:"Look for river?",yesNext:5,noNext:6},
    {pageNumber:4,text:"A huge T-Rex appears far away.",image:u("1446776811953-b23d57bd21aa"),question:"Hide?",yesNext:7,noNext:5},
    {pageNumber:5,text:"You find dinosaur footprints in the mud.",image:u("1504384308090-c894fdcc538d"),question:"Follow prints?",yesNext:7,noNext:6},
    {pageNumber:6,text:"The sun sets and you return safely through the portal.",image:u("1462331940025-496dfbfc7564")},
    {pageNumber:7,text:"You discover a nest of colorful dinosaur eggs.",image:u("1500530855697-b586d89ba3ee"),question:"Observe quietly?",yesNext:8,noNext:6},
    {pageNumber:8,text:"The mother dinosaur nods kindly and walks away.",image:u("1507525428034-b723cf961d3e")}
  ]
},
//6
{
  title:"Magic Tree Secret",
  description:"A talking tree shares ancient wisdom.",
  coverImage:u("1500534314209-a25ddb2bd429"),
  ageGroup:"6-10 years",
  pages:[
    {pageNumber:1,text:"A glowing tree stands in the quiet forest.",image:u("1500534314209-a25ddb2bd429"),question:"Approach it?",yesNext:2,noNext:3},
    {pageNumber:2,text:"The tree speaks gently and tells a story.",image:u("1500530855697-b586d89ba3ee"),question:"Listen carefully?",yesNext:4,noNext:5},
    {pageNumber:3,text:"You explore the forest path instead.",image:u("1504384308090-c894fdcc538d"),question:"Return to tree later?",yesNext:2,noNext:6},
    {pageNumber:4,text:"A small door opens in the trunk.",image:u("1501594907352-04cda38ebc29"),question:"Open it?",yesNext:7,noNext:5},
    {pageNumber:5,text:"Fireflies glow around the roots peacefully.",image:u("1507525428034-b723cf961d3e"),question:"Stay longer?",yesNext:7,noNext:6},
    {pageNumber:6,text:"You walk home with calm thoughts.",image:u("1462331940025-496dfbfc7564")},
    {pageNumber:7,text:"Inside are floating magical books and lights.",image:u("1506744038136-46273834b3fb"),question:"Take glowing seed?",yesNext:8,noNext:6},
    {pageNumber:8,text:"You plant the seed and promise to protect the forest.",image:u("1446776811953-b23d57bd21aa")}
  ]
},
//7
{
  title:"Robot City Rescue",
  description:"Fix a broken robot city.",
  coverImage:u("1504384308090-c894fdcc538d"),
  ageGroup:"7-12 years",
  pages:[
    {pageNumber:1,text:"Robot City lights flicker and machines stop.",image:u("1504384308090-c894fdcc538d"),question:"Investigate?",yesNext:2,noNext:3},
    {pageNumber:2,text:"A small robot asks for help fixing wires.",image:u("1500530855697-b586d89ba3ee"),question:"Repair it?",yesNext:4,noNext:5},
    {pageNumber:3,text:"You watch carefully from a safe spot.",image:u("1500534314209-a25ddb2bd429"),question:"Help later?",yesNext:2,noNext:6},
    {pageNumber:4,text:"The robot beeps happily and guides you to the control tower.",image:u("1507525428034-b723cf961d3e"),question:"Enter tower?",yesNext:7,noNext:5},
    {pageNumber:5,text:"Conveyor belts jam and sparks fly.",image:u("1465101046530-73398c7f28ca"),question:"Fix belts?",yesNext:7,noNext:6},
    {pageNumber:6,text:"The city slowly shuts down for the night.",image:u("1462331940025-496dfbfc7564")},
    {pageNumber:7,text:"You reconnect the power core and lights glow again.",image:u("1506744038136-46273834b3fb"),question:"Celebrate?",yesNext:8,noNext:6},
    {pageNumber:8,text:"All robots cheer and thank you for saving the city.",image:u("1446776811953-b23d57bd21aa")}
  ]
},
//8
{
  title:"Flying Kite Dream",
  description:"A magical kite takes you to the sky.",
  coverImage:u("1500530855697-b586d89ba3ee"),
  ageGroup:"5-8 years",
  pages:[
    {pageNumber:1,text:"You find a colorful kite on a windy hill.",image:u("1500530855697-b586d89ba3ee"),question:"Hold it tight?",yesNext:2,noNext:3},
    {pageNumber:2,text:"The kite lifts you gently into the sky.",image:u("1500534314209-a25ddb2bd429"),question:"Fly higher?",yesNext:4,noNext:5},
    {pageNumber:3,text:"You watch the clouds from the ground.",image:u("1504384308090-c894fdcc538d"),question:"Try again later?",yesNext:2,noNext:6},
    {pageNumber:4,text:"You soar above hills and rivers.",image:u("1507525428034-b723cf961d3e"),question:"Follow rainbow?",yesNext:7,noNext:5},
    {pageNumber:5,text:"Birds fly beside you happily.",image:u("1465101046530-73398c7f28ca"),question:"Race them?",yesNext:7,noNext:6},
    {pageNumber:6,text:"The kite lands softly back on the grass.",image:u("1462331940025-496dfbfc7564")},
    {pageNumber:7,text:"The sunset paints the sky orange and pink.",image:u("1446776811953-b23d57bd21aa"),question:"Stay longer?",yesNext:8,noNext:6},
    {pageNumber:8,text:"You land smiling after a magical flying adventure.",image:u("1506744038136-46273834b3fb")}
  ]
}
  ];

  await Story.insertMany(stories);

  console.log("✅ 8 stories with stable Unsplash images added!");
  process.exit();
}

seed();