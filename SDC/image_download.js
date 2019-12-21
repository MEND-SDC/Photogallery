const download = require('image-downloader');
// const { exec } = require('child_process');
// aws s3 sync . s3://sdcroomphotos/photos

const rooms = ['bedroom', 'door', 'backyard', 'diningroom', 'kitchen', 'foyer', 'patio', 'backyard', 'porch', 'hallway']
let index = -1;

for (let i = 1; i < 1001; i++) {
  index++;
  let room = rooms[index];

  if (index === 10) {
    index = -1;
  }

  let options = {
    url: `https://source.unsplash.com/random/800x600/?${room}`,
    dest: `./images/photo${i}.jpg`              
  }

  download.image(options)
    .then(({ filename, image }) => {
      console.log('Saved to ', filename);
    })
    .catch((err) => console.log(err));
}


