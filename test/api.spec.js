import { expect } from 'chai';
import { search } from '../src/Torrent';


describe('Torrent ->', () => {
  describe('search() ->', () => {
    const queries = [
      'game of thrones s01e02',
      'game of thrones s06e06',
      'sherlock s01e02',
      'game of thrones season 1 complete',
      'game of thrones season 3',
      'quantico season 3',
      'the dark knight',
      'game of thrones season 6',
      'game of thrones season 6 complete',
      'game of thrones s06 complete',
      'game of thrones season 6 s06 complete'
    ];

    for (let i = 0; i < queries.length; i++) {
      it(`${i}: should return valid search queries`, async done => {
        try {
          const searchResults = await search(queries[i]);
          assertSearchResults(searchResults);
          done();
        } catch (err) {
          done(err);
        }
      });
    }
  });
});


function assertSearchResults(searchResults) {
  expect(searchResults).to.be.an('array');
  expect(searchResults).to.have.length.above(10);

  for (const result of searchResults) {
    expect(result).to.have.property('magnet')
      .that.is.a('string');
    expect(result.magnet).to.not.include('undefined');

    expect(result).to.have.property('metadata')
      .that.is.a('string');
    expect(result.metadata).to.not.include('undefined');

    expect(result).to.have.property('title')
      .that.is.a('string');
    expect(result.metadata).to.not.include('undefined');

    expect(result).to.have.property('verified')
      .that.is.a('boolean');

    expect(result).to.have.property('seeders')
      .that.is.a('number');

    expect(result).to.have.property('leechers')
      .that.is.a('number');
  }
}
