Feature('Fav Restaurants');

Scenario('favorite a restaurant', ({ I }) => {
  I.amOnPage('/#/home');
  I.click(locate('.list-item a').first());
  I.seeElement('#likeButton');
  I.click('#likeButton');
  I.amOnPage('/#/favorite');
  I.seeElement('.list-item');
});

  Scenario('unfavorite a restaurant', ({ I }) => {
    I.amOnPage('/#/home');
    I.seeElement('.list-item');
    I.click(locate('.list-item a').first());
    I.seeElement('#likeButton');
    I.click('#likeButton');
    I.amOnPage('/#/favorite');
    I.seeElement('.list-item');
    I.click(locate('.list-item a').first());
    I.seeElement('#likeButton');
    I.click('#likeButton');
    I.amOnPage('/#/favorite');
  }
);

