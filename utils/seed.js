const mongoose = require("mongoose");
const Story = require("../models/story.js");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI).then(async () => {

  console.log("MongoDB Connected for Seeding");

  // helper for guaranteed working images
  const img = (id) => `https://picsum.photos/id/${id}/900/600`;

  /* =====================================================
     SPACE STORY
  ===================================================== */
  const spaceBig = {
    title: "Arjun and the Lost Star City",
    description: "A young explorer travels through space to save a city of living stars.",
    coverImage: img(1003),
    ageGroup: "7-12 years",

    pages: [
      { pageNumber: 1, text: "Arjun watches the night sky...", image: img(1011), question: "Go outside?", yesNext: 2, noNext: 3 },
      { pageNumber: 2, text: "He finds a glowing robot.", image: img(1015), question: "Repair ship?", yesNext: 4, noNext: 5 },
      { pageNumber: 3, text: "He stays inside but hears blinking.", image: img(1016), question: "Change mind?", yesNext: 2, noNext: 6 },
      { pageNumber: 4, text: "Robot invites him to Star City.", image: img(1018), question: "Board ship?", yesNext: 7, noNext: 6 },
      { pageNumber: 5, text: "Ship powers down sadly.", image: img(1020), question: "Help now?", yesNext: 4, noNext: 6 },
      { pageNumber: 6, text: "He sleeps wondering...", image: img(1024), question: "Wake up?", yesNext: 2, noNext: 15 },
      { pageNumber: 7, text: "Ship zooms into space!", image: img(1025), question: "Look out window?", yesNext: 8, noNext: 9 },
      { pageNumber: 8, text: "Meteors ahead!", image: img(1031), question: "Dodge?", yesNext: 10, noNext: 11 },
      { pageNumber: 9, text: "Speed boosts too much.", image: img(1033), question: "Slow down?", yesNext: 10, noNext: 11 },
      { pageNumber: 10, text: "They reach Star City.", image: img(1035), question: "Meet king?", yesNext: 12, noNext: 13 },
      { pageNumber: 11, text: "Robot saves control.", image: img(1037), question: "Continue?", yesNext: 10, noNext: 15 },
      { pageNumber: 12, text: "Crystal fading problem.", image: img(1040), question: "Search cave?", yesNext: 14, noNext: 13 },
      { pageNumber: 13, text: "City grows dimmer.", image: img(1041), question: "Help now?", yesNext: 12, noNext: 15 },
      { pageNumber: 14, text: "He restores the crystal!", image: img(1042) },
      { pageNumber: 15, text: "Returns home brave and happy ⭐🚀", image: img(1043) }
    ]
  };

  /* =====================================================
     FOREST BEDTIME
  ===================================================== */
  const forestBedtime = {
    title: "Mimi the Bunny’s Moonlight Journey",
    description: "A gentle bedtime forest walk.",
    coverImage: img(1050),
    ageGroup: "4-9 years",

    pages: [
      { pageNumber: 1, text: "Mimi peeks outside.", image: img(1051), question: "Hop out?", yesNext: 2, noNext: 3 },
      { pageNumber: 2, text: "Fireflies sparkle.", image: img(1052), question: "Follow?", yesNext: 4, noNext: 5 },
      { pageNumber: 3, text: "Hears owl hooting.", image: img(1053), question: "Check?", yesNext: 2, noNext: 12 },
      { pageNumber: 4, text: "Meets Oliver owl.", image: img(1054), question: "Help?", yesNext: 6, noNext: 5 },
      { pageNumber: 5, text: "Finds berries.", image: img(1055), question: "Share?", yesNext: 6, noNext: 7 },
      { pageNumber: 6, text: "Walk through glowing grass.", image: img(1056), question: "Sing?", yesNext: 8, noNext: 7 },
      { pageNumber: 7, text: "Splash near pond.", image: img(1057), question: "Look?", yesNext: 9, noNext: 8 },
      { pageNumber: 8, text: "Everyone sleepy.", image: img(1058), question: "Keep walking?", yesNext: 9, noNext: 12 },
      { pageNumber: 9, text: "Baby duck stuck.", image: img(1059), question: "Help?", yesNext: 10, noNext: 12 },
      { pageNumber: 10, text: "Duck family thanks.", image: img(1060), question: "Go home?", yesNext: 11, noNext: 12 },
      { pageNumber: 11, text: "Cozy burrow sleep.", image: img(1061) },
      { pageNumber: 12, text: "Falls asleep under stars 🌙", image: img(1062) }
    ]
  };

  /* =====================================================
     JUNGLE STORY
  ===================================================== */
  const storyBig = {
    title: "Jungle Guardian Quest",
    description: "A brave jungle protector adventure.",
    coverImage: img(1070),
    ageGroup: "7-12 years",

    pages: [
      { pageNumber: 1, text: "Morning jungle sunlight.", image: img(1071), question: "Follow tracks?", yesNext: 2, noNext: 3 },
      { pageNumber: 2, text: "Wolves near river.", image: img(1072), question: "Help?", yesNext: 4, noNext: 5 },
      { pageNumber: 3, text: "Monkey steals fruit.", image: img(1073), question: "Chase?", yesNext: 6, noNext: 5 },
      { pageNumber: 4, text: "Smoke rising.", image: img(1074), question: "Call elephants?", yesNext: 7, noNext: 8 },
      { pageNumber: 5, text: "Meet turtle.", image: img(1075), question: "Follow turtle?", yesNext: 4, noNext: 9 },
      { pageNumber: 6, text: "Magic mango.", image: img(1076), question: "Eat?", yesNext: 10, noNext: 4 },
      { pageNumber: 7, text: "Elephants stop fire.", image: img(1077), question: "Search cause?", yesNext: 11, noNext: 12 },
      { pageNumber: 8, text: "Gets tired but brave.", image: img(1078), question: "Rest?", yesNext: 9, noNext: 11 },
      { pageNumber: 9, text: "Bear teaches survival.", image: img(1079), question: "Train?", yesNext: 10, noNext: 11 },
      { pageNumber: 10, text: "Feels stronger.", image: img(1080), question: "Track smoke?", yesNext: 11, noNext: 12 },
      { pageNumber: 11, text: "Hunters found.", image: img(1081), question: "Scare them?", yesNext: 13, noNext: 14 },
      { pageNumber: 12, text: "Night falls peacefully.", image: img(1082), question: "Go home?", yesNext: 15, noNext: 11 },
      { pageNumber: 13, text: "Animals unite victory!", image: img(1083) },
      { pageNumber: 14, text: "Quiet hero saves all.", image: img(1084) },
      { pageNumber: 15, text: "Guardian of the Forest 🌿", image: img(1085) }
    ]
  };

  /* =====================================================
     HERO STORY
  ===================================================== */
  const heroBig = {
    title: "The Little Hero of Sundar Village",
    description: "Village protector story.",
    coverImage: img(1090),
    ageGroup: "7-12 years",

    pages: [
      { pageNumber: 1, text: "Ravi helps everyone.", image: img(1091), question: "Help old lady?", yesNext: 2, noNext: 3 },
      { pageNumber: 2, text: "Bracelet glows.", image: img(1092), question: "Wear it?", yesNext: 4, noNext: 3 },
      { pageNumber: 3, text: "Goats run loose.", image: img(1093), question: "Chase?", yesNext: 4, noNext: 5 },
      { pageNumber: 4, text: "Super strength!", image: img(1094), question: "Test strength?", yesNext: 6, noNext: 7 },
      { pageNumber: 5, text: "Rain clouds gather.", image: img(1095), question: "Protect villagers?", yesNext: 6, noNext: 7 },
      { pageNumber: 6, text: "Villagers cheer.", image: img(1096), question: "Search trouble?", yesNext: 8, noNext: 9 },
      { pageNumber: 7, text: "Helps kids cross river.", image: img(1097), question: "Keep helping?", yesNext: 8, noNext: 9 },
      { pageNumber: 8, text: "Bandits attack crops.", image: img(1098), question: "Fight?", yesNext: 10, noNext: 11 },
      { pageNumber: 9, text: "Grandpa teaches tricks.", image: img(1099), question: "Train?", yesNext: 10, noNext: 11 },
      { pageNumber: 10, text: "Runs like wind.", image: img(1100), question: "Catch leader?", yesNext: 12, noNext: 13 },
      { pageNumber: 11, text: "Traps scare bandits.", image: img(1101) },
      { pageNumber: 12, text: "Village saved!", image: img(1102) },
      { pageNumber: 13, text: "Peace returns.", image: img(1103) }
    ]
  };

  await Story.insertMany([storyBig, forestBedtime, spaceBig, heroBig]);

  console.log("✅ All stories inserted successfully!");
  process.exit(0);

}).catch(err => {
  console.error(err);
  process.exit(1);
});