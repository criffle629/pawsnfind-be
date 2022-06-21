
exports.seed = async function(knex, Promise) {
  await knex('pictures').del()
  await knex.raw('ALTER SEQUENCE pictures_id_seq RESTART WITH 1')  
  // Deletes ALL existing entries
    .then(function () {
      // Inserts seed entries
      return knex('pictures').insert([
        {img_id: 1, img_url: 'https://jngnposwzs-flywheel.netdna-ssl.com/wp-content/uploads/2019/08/CatofMth-Typhoon.jpg', animal_id: 1},
        {img_id: 2, img_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyGMzMi2ZQdBIHQkdLbIrolWVePbaFhN-zMBbwhqKag26SVN3lDw', animal_id: 2},
        {img_id: 3, img_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0nMNVVbLEFXWF2HsRQ3veNxJnR-htnJ5cxQyYTFuu6lzX2Qz-nA', animal_id: 3},
        {img_id: 4, img_url: 'https://epi.azureedge.net/website-images/images/a-year-in-the-life-dog/dog_7_600x400.jpg?sfvrsn=edc6d67b_2', animal_id: 4},
        {img_id: 5, img_url: 'https://www.petmd.com/sites/default/files/the-cat-which-sleeps-picture-id596060186.jpg', animal_id: 5},
        {img_id: 6, img_url: 'https://www.catster.com/wp-content/uploads/2014/08/An-albino-cat.jpg', animal_id: 6},
        {img_id: 7, img_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbX3XnR5f3qVPdtliKan9KoyT6x4LYg6tzpYKJ_6vOXNTgRXKH', animal_id: 7},
        {img_id: 8, img_url: 'https://www.cachehumane.org/data/pics/2019-40609-1.jpg', animal_id: 8},
        {img_id: 9, img_url: 'https://humanepa.org/wp-content/uploads/sunny-1-767x1024.jpeg', animal_id: 9},
        {img_id: 10, img_url: 'https://s3.amazonaws.com/filestore.rescuegroups.org/6685/pictures/animals/14517/14517577/66521595_500x500.jpg', animal_id: 10},
        {img_id: 11, img_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU70xUb0PpAmeMf4d7_NusyXyfuAUit3g0Xed-O3z53gUILMCT', animal_id: 11},
        {img_id: 12, img_url: 'https://assets.marthastewart.com/styles/wmax-570/d14/cat-getty-0419/cat-getty-0419_sq.jpg?itok=Tcwis6X0', animal_id: 12},
        {img_id: 13, img_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgEmS14rzA1p8r-fzrm2BfiZivVFAMuBjIa9CDBkHiyqJpyLST', animal_id: 13},
        {img_id: 14, img_url: 'https://live-cdn.shelterluv.com/sites/default/files/animal_pics/3451/2019/04/10/08/20190410085205.png', animal_id: 14},
        {img_id: 15, img_url: 'http://www.pethealthnetwork.com/sites/default/files/content/images/5-silent-killers-cats-475212379.jpg', animal_id: 15},
        {img_id: 16, img_url: 'https://getyourpet.com/photos/3b4e63e4-82b5-4ff1-81ee-b446d1db2946/pet-photo-260545.png', animal_id: 16},
        {img_id: 17, img_url: 'https://www.animalhouseshelter.com/wp-content/uploads/2019/07/balloon-1-600x600.jpg', animal_id: 17},
        {img_id: 18, img_url: 'https://s3.amazonaws.com/filestore.rescuegroups.org/8383/pictures/animals/14310/14310797/66226306_500x670.jpg', animal_id: 18},
        {img_id: 19, img_url: 'https://assets.marthastewart.com/styles/wmax-570/d27/cat-playing-getty-845697720/cat-playing-getty-845697720_sq.jpg?itok=z54mcIDR', animal_id: 19},
        {img_id: 20, img_url: 'https://kubrick.htvapps.com/htv-prod-media.s3.amazonaws.com/images/ducky-1555692367.jpg?crop=1.00xw:0.420xh;0,0.144xh&resize=900:*', animal_id: 20},
        {img_id: 21, img_url: 'https://s3.amazonaws.com/filestore.rescuegroups.org/1576/pictures/animals/14220/14220175/65463952_500x666.jpg', animal_id: 21},
        {img_id: 22, img_url: 'https://media.mnn.com/assets/images/2018/04/toby_cat_playing.jpg.653x0_q80_crop-smart.jpg', animal_id: 22},
        {img_id: 23, img_url: 'https://s.hdnux.com/photos/01/00/06/67/16805365/3/920x920.jpg', animal_id: 23},
        {img_id: 24, img_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_EFvy2G4Xl2IYdFIGShpd3GkbVMpK2EXUynGx2XnWj1rqOBZ5-g', animal_id: 24},
        {img_id: 25, img_url: 'https://s3.amazonaws.com/filestore.rescuegroups.org/6685/pictures/animals/14523/14523934/66603731_500x500.jpg', animal_id: 25}
      ]);
    });
};
