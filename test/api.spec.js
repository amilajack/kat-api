import { expect } from 'chai';
import { search } from '../src/Torrent';


describe('Torrent ->', () => {
  describe('search() ->', () => {
    it('should search torrents', async done => {
      try {
        const searchResults = await search('game of thrones');
        expect(searchResults).to.be.an('array');

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

          expect(result).to.have.property('seeders').that.is.a('number');
          expect(result).to.have.property('leechers').that.is.a('number');
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });
});
