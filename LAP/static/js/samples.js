// Written by _tools/build_assets.py: the eight [class id, noise seed, class name] columns of each comparison.
const SAMPLE_COLUMNS = {
  "teachers/MAE": [[88, 1, "macaw"], [22, 1, "bald eagle"], [259, 0, "Pomeranian"], [386, 2, "African elephant"], [323, 3, "monarch"], [383, 3, "ring-tailed lemur"], [661, 0, "Model T"], [31, 4, "tree frog"]],
  "teachers/AIMv2": [[9, 1, "ostrich"], [279, 3, "Arctic fox"], [497, 0, "church"], [89, 4, "cockatoo"], [352, 1, "impala"], [661, 0, "Model T"], [22, 4, "bald eagle"], [323, 3, "monarch"]],
  "teachers/CLIP": [[105, 3, "koala"], [144, 1, "pelican"], [129, 3, "spoonbill"], [263, 3, "corgi"], [340, 1, "zebra"], [980, 2, "volcano"], [150, 3, "sea lion"], [327, 3, "starfish"]],
  "teachers/DINOv3": [[417, 2, "hot-air balloon"], [96, 3, "toucan"], [93, 0, "hornbill"], [250, 2, "husky"], [89, 1, "cockatoo"], [352, 3, "impala"], [301, 0, "ladybug"], [327, 0, "starfish"]],
  "teachers/DINOv2": [[130, 0, "flamingo"], [129, 1, "spoonbill"], [949, 0, "strawberry"], [22, 2, "bald eagle"], [93, 3, "hornbill"], [293, 2, "cheetah"], [270, 3, "white wolf"], [948, 1, "Granny Smith"]],
  "recipes/iREPA": [[250, 4, "husky"], [144, 1, "pelican"], [97, 1, "drake"], [294, 4, "brown bear"], [354, 0, "camel"], [953, 2, "pineapple"], [22, 2, "bald eagle"], [100, 2, "black swan"]],
  "recipes/VA-REPA": [[250, 1, "husky"], [263, 0, "corgi"], [89, 2, "cockatoo"], [724, 0, "pirate ship"], [22, 0, "bald eagle"], [100, 0, "black swan"], [33, 1, "sea turtle"], [661, 0, "Model T"]],
  "recipes/REG": [[263, 0, "corgi"], [417, 2, "hot-air balloon"], [22, 2, "bald eagle"], [100, 3, "black swan"], [404, 0, "airliner"], [9, 0, "ostrich"], [350, 2, "ibex"], [31, 1, "tree frog"]],
  "recipes/sREPA": [[207, 4, "golden retriever"], [9, 0, "ostrich"], [250, 1, "husky"], [22, 2, "bald eagle"], [129, 0, "spoonbill"], [724, 0, "pirate ship"], [393, 0, "clownfish"], [33, 1, "sea turtle"]],
  "tokenizers/SD-VAE": [[88, 1, "macaw"], [22, 1, "bald eagle"], [259, 0, "Pomeranian"], [386, 2, "African elephant"], [323, 3, "monarch"], [383, 3, "ring-tailed lemur"], [661, 0, "Model T"], [31, 4, "tree frog"]],
  "tokenizers/EQ-VAE": [[207, 1, "golden retriever"], [953, 0, "pineapple"], [383, 1, "ring-tailed lemur"], [24, 4, "great grey owl"], [22, 2, "bald eagle"], [144, 3, "pelican"], [279, 1, "Arctic fox"], [661, 0, "Model T"]],
  "tokenizers/REPA-E VAE": [[279, 2, "Arctic fox"], [22, 1, "bald eagle"], [352, 2, "impala"], [100, 3, "black swan"], [129, 1, "spoonbill"], [817, 1, "sports car"], [323, 4, "monarch"], [839, 0, "suspension bridge"]],
  "scale/MAE": [[148, 1, "killer whale"], [89, 4, "cockatoo"], [352, 3, "impala"], [953, 0, "pineapple"], [1, 4, "goldfish"], [107, 3, "jellyfish"], [33, 2, "sea turtle"], [437, 1, "lighthouse"]],
  "scale/DINOv2": [[263, 1, "corgi"], [393, 0, "clownfish"], [281, 3, "tabby cat"], [107, 1, "jellyfish"], [352, 3, "impala"], [839, 0, "suspension bridge"], [93, 3, "hornbill"], [817, 4, "sports car"]],
};
