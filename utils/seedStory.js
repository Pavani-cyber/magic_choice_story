const mongoose = require("mongoose");
require("dotenv").config();
// console.log("URI:", process.env.MONGO_URI); 
const Story = require("../models/story.js");
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {

    console.log("MongoDB Connected for Seeding");

    // Clear old data
    await Story.deleteMany();

    //story1
    const story1 = {
      title: "Monkey and the Magic Forest",
      description: "A fun interactive story where kids choose the path",
      coverImage: "https://img.freepik.com/premium-vector/happy-monkey-cartoon-playing-forest_43633-12923.jpg?semt=ais_hybrid&w=740&q=80",
      ageGroup: "5-8 years",
      pages: [
        {
          pageNumber: 1,
          text: `Milo the monkey woke up early in the jungle feeling excited.
He played all morning and became thirsty near a stream.`,
          image: "https://images.unsplash.com/photo-1644352516658-7236c1677a82?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          question: "Does the monkey drink water?",
          yesNext: 2,
          noNext: 3
        },
        {
          pageNumber: 2,
          text: `Milo drank cool water and felt energetic.
He saw a glowing magical banana nearby.`,
          image: "https://pixabay.com/images/download/jimbo457-ai-generated-8674827_1920.jpg",
          question: "Should the monkey climb a tree?",
          yesNext: 4,
          noNext: 5
        },
        {
          pageNumber: 3,
          text: `Milo didn’t drink water and became tired.`,
          image: "https://pixabay.com/images/download/clker-free-vector-images-monkey-303612_1280.png", 
          question: "Should he rest under a tree?",
          yesNext: 4,
          noNext: 5
        },
        {
          pageNumber: 4,
          text: "Milo learned that every choice brings a new adventure. He smiles happily.",
          image:"https://pixabay.com/images/download/quinnbrak-ai-generated-8949402_1920.png" },
        {
          pageNumber: 5,
          text: "The monkey feels weak and goes home to rest.",
          image: "https://pixabay.com/images/download/olenchic-ai-generated-9310516_1920.jpg"
        }
      ]
    };


   //story2
    const story2 = {
      title: "Pirate Adventure",
      description: "An interactive story of a young pirate seeking treasure",
      coverImage: "https://thumbs.dreamstime.com/b/black-ship-captain-looking-telescope-young-black-female-ship-captain-uniform-standing-bow-cruise-ship-115554432.jpg",
      ageGroup: "6-10 years",
      pages: [
        {
          pageNumber: 1,
          text: "Captain Lily spots a mysterious island from her pirate ship.",
          image: "https://thumbs.dreamstime.com/b/black-ship-captain-looking-telescope-young-black-female-ship-captain-uniform-standing-bow-cruise-ship-115554432.jpg",
          question: "Sail to the island?",
          yesNext: 2,
          noNext: 3
        },
        {
          pageNumber: 2,
          text: "She finds a treasure map leading to a cave.",
          image: "https://img.freepik.com/premium-photo/cartoon-pirate-ship-sailing-past-mysterious-treasure-filled-island-cave_994764-209234.jpg?w=360",
          question: "Follow the map?",
          yesNext: 4,
          noNext: 5
        },
        {
          pageNumber: 3,
          text: "She avoids the island but wonders what treasure she missed.",
          image: "https://thumbs.dreamstime.com/b/pirate-island-treasure-map-adventure-exploration-hidden-riches-art-vector-design-generative-ai-lively-illustration-406803833.jpg",
          question: "Return later?",
          yesNext: 2,
          noNext: 5
        },
        {
          pageNumber: 4,
          text: "She discovers gold and jewels. The crew celebrates!",
          image: "https://media.istockphoto.com/id/1063671300/vector/treasure-cave-with-chest-gold-coins-gems-concept-art-for-computer-game-background-image-to.jpg?s=612x612&w=0&k=20&c=FigAmg7EmiTaicIXi-oF0LXRYryAegULfs89XYJXARA="
        },
        {
          pageNumber: 5,
          text: "She sails home safely, dreaming of future adventures.",
          image: "https://img.freepik.com/free-photo/view-fantasy-pirate-ship_23-2151488535.jpg?semt=ais_user_personalization&w=740&q=80"
        }
      ]
    };


    //story3
    const story3 = {
      title: "Magical Forest Quest",
      description: "A magical adventure where kids explore a forest and make smart choices",
      coverImage: "https://m.media-amazon.com/images/I/813HtkH0M2L._UF1000,1000_QL80_.jpg",
      ageGroup: "7-12 years",
      pages: [
        {
          pageNumber: 1,
          text: "Aarav finds a glowing map and gets transported to a magical forest.",
          image: "https://i.ytimg.com/vi/fuMzr1lHnAU/sddefault.jpg",
          question: "Follow the rabbit guide?",
          yesNext: 2,
          noNext: 3
        },
        {
          pageNumber: 2,
          text: "Three paths appear: flowers, cave, and bridge.",
          image: "https://thumbs.dreamstime.com/b/stone-bridge-crosses-river-forest-cartoon-illustration-shows-tall-trees-green-grass-colorful-flowers-solid-brick-315507375.jpg",
          question: "Choose flower path?",
          yesNext: 4,
          noNext: 5
        },
        {
          pageNumber: 3,
          text: "He meets a scared baby deer stuck in thorns.",
          image: "https://s1.dmcdn.net/v/AcUUd1eov5KmMxB5Q/x720",
          question: "Help the deer?",
          yesNext: 6,
          noNext: 7
        },
        {
          pageNumber: 4,
          text: "Flowers give him a silver key.",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ7IhXFTAsg-h-KwN_oufrbHdmoU8qu-pD7w&s",
          question: "Continue?",
          yesNext: 8,
          noNext: 8
        },
        {
          pageNumber: 5,
          text: "A turtle gives him a shield in the cave.",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_nEdYErp-jJ-qgALZi-WvP2gqrxR0XgZSMQ&s",
          question: "Continue?",
          yesNext: 8,
          noNext: 8
        },
        {
          pageNumber: 6,
          text: "The deer becomes a fairy and gives sparkle dust.",
          image: "https://thumbs.dreamstime.com/b/fairy-deer-forest-fantasy-scene-magical-creatures-fairytale-woodland-vector-design-generative-ai-enchanting-setting-374502114.jpg",
          question: "Fly to temple?",
          yesNext: 8,
          noNext: 8
        },
        {
          pageNumber: 7,
          text: "He walks alone and reaches the temple tired.",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm72X-I_ruWZww3puhDqjjEEWxuXtn_gBlAg&s",
          question: "Enter?",
          yesNext: 8,
          noNext: 8
        },
        {
          pageNumber: 8,
          text: "A dragon guards the Crystal of Wishes.",
          image: "https://thumbs.dreamstime.com/b/cartoon-dragon-guarding-treasure-chest-full-gold-coins-cute-red-cartoon-dragon-smiles-guarding-wooden-chest-overflowing-386463258.jpg",
          question: "Talk peacefully?",
          yesNext: 9,
          noNext: 10
        },
        {
          pageNumber: 9,
          text: "The dragon becomes his friend. Friendship wins!",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp8_NhN-O8Yu8W5eKoBXB6nMD7Vti8c4Jkqw&s"
        },
        {
          pageNumber: 10,
          text: "He fights bravely and becomes a hero!",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYKG6GXG3uWkOvFxkq5GH6FuiS1ZPjjk5gA&s"
        }
      ]
    };
//insert all stories
    await Story.insertMany([story1, story2, story3]);

    console.log("✅ All stories inserted successfully!");

    process.exit(0);

  })
  .catch(err => {
    console.error("❌ Error inserting data:", err);
    process.exit(1);
  });
