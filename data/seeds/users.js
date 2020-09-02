
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: "new_user_01", password: 'c3ab8ff13720e8ad9047dd39466b3c8974e592c2fa383d4a3960714caef0c4f2'},
        {id: 2, username: "new_user_02", password: '253c2e786c2414dcaec8dbf11df515b5075371454b93a5687d24d96ddbf3b939'},
        {id: 3, username: "new_user_03", password: '936a185caaa266bb9cbe981e9e05cb78cd732b0b3280eb944412bb6f8f8f07af'},
        {id: 4, username: "new_user_04", password: '4b2d3319d889de1aa4f3f1833a9d1d35ccc0f1f6ec14570111be24f329258286'},
        {id: 5, username: "new_user_05", password: '70e18cb7fcdc50bf3f0389c7e543aaf812fb8b34960d7def6cd3bcec07629b70'}
      ]);
    });
};
