const mongoose = require("mongoose");
const Story = require("../models/story");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);

const img = (id) => `https://picsum.photos/id/${id}/900/600`;

async function seed() {

await Story.deleteMany();

const stories = [

/* ======================================================
   STORY 1 — Monkey and the Magic Forest
====================================================== */
{
title: "Monkey and the Magic Forest",
description: "Milo the monkey explores a glowing magical jungle.",
coverImage: img(200),
ageGroup: "5-8 years",
pages: [

{ pageNumber:1, text:"Milo the monkey woke up as golden sunlight filled the jungle. The leaves sparkled like stars.", image:img(201), question:"Should Milo explore deeper into the forest?", yesNext:2, noNext:3 },

{ pageNumber:2, text:"He jumped happily from tree to tree and found colorful butterflies dancing around him.", image:img(202), question:"Follow the butterflies?", yesNext:4, noNext:5 },

{ pageNumber:3, text:"He stayed near home and ate bananas peacefully, but felt a little bored.", image:img(203) },

{ pageNumber:4, text:"The butterflies led him to a glowing tree with magical fruits shining like gems.", image:img(204), question:"Taste the fruit?", yesNext:6, noNext:5 },

{ pageNumber:5, text:"He heard a river nearby. The water looked cool and refreshing.", image:img(205), question:"Cross the river?", yesNext:6, noNext:7 },

{ pageNumber:6, text:"The fruit gave Milo special energy! He jumped higher than ever and laughed with joy.", image:img(206) },

{ pageNumber:7, text:"A rainbow appeared in the sky. Milo rested and watched the sunset happily.", image:img(207) }

]
},

/* ======================================================
   STORY 2 — Jungle Guardian Quest
====================================================== */
{
title:"Jungle Guardian Quest",
description:"Help save the animals of the jungle.",
coverImage:img(210),
ageGroup:"7-12 years",
pages:[

{pageNumber:1,text:"You are chosen as the Jungle Guardian. Suddenly you hear animals crying for help.",image:img(211),question:"Run toward the sound?",yesNext:2,noNext:3},
{pageNumber:2,text:"A baby deer is trapped under a fallen branch.",image:img(212),question:"Lift the branch?",yesNext:4,noNext:5},
{pageNumber:3,text:"You patrol safely but the cries grow louder.",image:img(213),question:"Go back to help?",yesNext:2,noNext:6},
{pageNumber:4,text:"You save the deer. All animals cheer for you!",image:img(214)},
{pageNumber:5,text:"The storm grows stronger and you hide safely in a cave.",image:img(215)},
{pageNumber:6,text:"Morning arrives and the jungle is peaceful again.",image:img(216)}

]
},

/* ======================================================
   STORY 3 — Magical Forest Quest
====================================================== */
{
title:"Magical Forest Quest",
description:"A glowing map leads to a hidden treasure.",
coverImage:img(220),
ageGroup:"7-12 years",
pages:[

{pageNumber:1,text:"You find a mysterious glowing map under your pillow.",image:img(221),question:"Follow the map?",yesNext:2,noNext:3},
{pageNumber:2,text:"The map guides you to a deep forest where fireflies light the path.",image:img(222),question:"Enter the cave?",yesNext:4,noNext:5},
{pageNumber:3,text:"You stay home, wondering what adventure you missed.",image:img(223)},
{pageNumber:4,text:"Inside the cave you discover an ancient treasure chest.",image:img(224)},
{pageNumber:5,text:"A friendly fairy appears and gives you a magic star as a gift.",image:img(225)}

]
},

/* ======================================================
   STORY 4 — Pirate Adventure
====================================================== */
{
title:"Pirate Adventure",
description:"Sail the seas and search for treasure.",
coverImage:img(230),
ageGroup:"6-10 years",
pages:[

{pageNumber:1,text:"Captain Leo sails across the bright blue sea with his pirate crew.",image:img(231),question:"Follow the treasure map?",yesNext:2,noNext:3},
{pageNumber:2,text:"They reach a secret island covered with palm trees.",image:img(232),question:"Dig for treasure?",yesNext:4,noNext:5},
{pageNumber:3,text:"A storm pushes the ship back home safely.",image:img(233)},
{pageNumber:4,text:"Gold coins sparkle in the sand. Treasure found!",image:img(234)},
{pageNumber:5,text:"They build a sandcastle and enjoy the sunny day.",image:img(235)}

]
},

/* ======================================================
   STORY 5 — Lost Star City
====================================================== */
{
title:"Arjun and the Lost Star City",
description:"A brave space adventure among the stars.",
coverImage:img(240),
ageGroup:"7-12 years",
pages:[

{pageNumber:1,text:"Arjun blasts off in his rocket toward space.",image:img(241),question:"Land on the glowing planet?",yesNext:2,noNext:3},
{pageNumber:2,text:"He finds a city made of shining stars and friendly aliens.",image:img(242)},
{pageNumber:3,text:"He orbits Earth and returns home safely.",image:img(243)}

]
},

/* ======================================================
   STORY 6 — Little Hero Village
====================================================== */
{
title:"Little Hero Village",
description:"A small child protects the village bravely.",
coverImage:img(250),
ageGroup:"6-10 years",
pages:[
{pageNumber:1,text:"A storm threatens the village. Everyone looks worried.",image:img(251),question:"Help them?",yesNext:2,noNext:3},
{pageNumber:2,text:"You guide everyone to safety. They call you their hero!",image:img(252)},
{pageNumber:3,text:"You stay home and the storm passes quietly.",image:img(253)}
]
},

/* ======================================================
   STORY 7 — Ocean Explorer
====================================================== */
{
title:"Ocean Explorer Adventure",
description:"Discover life under the sea.",
coverImage:img(260),
ageGroup:"6-10 years",
pages:[
{pageNumber:1,text:"You dive underwater in a small yellow submarine.",image:img(261),question:"Explore coral reef?",yesNext:2,noNext:3},
{pageNumber:2,text:"Bright fish and turtles swim around you happily.",image:img(262)},
{pageNumber:3,text:"You return safely to the beach.",image:img(263)}
]
},

/* ======================================================
   STORY 8 — Dinosaur Valley
====================================================== */
{
title:"Dinosaur Valley Quest",
description:"Travel back to the dinosaur world.",
coverImage:img(270),
ageGroup:"6-10 years",
pages:[
{pageNumber:1,text:"Your time machine sends you to dinosaur land!",image:img(271),question:"Follow the baby dinosaur?",yesNext:2,noNext:3},
{pageNumber:2,text:"It leads you to a peaceful valley full of giant friends.",image:img(272)},
{pageNumber:3,text:"You safely return home with amazing memories.",image:img(273)}
]
}

];

await Story.insertMany(stories);
console.log("✅ All full stories added!");
process.exit();
}

seed();