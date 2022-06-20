import apis from './api'

jest.mock('axios'); // This overwrites axios methods with jest Mock
import axios from 'axios';

describe('Test Get Apis', (apiUrl, apiData) => {
    describe('getResource', (apiUrl, apiData) => {
        describe('with success', (apiUrl, apiData) => {
            const url = `https://irembo-system-design-backend.herokuapp.com/${apiUrl}`;
            const onComplete = jest.fn();
            const data = apiData;

            beforeEach(() => {
                axios.get.mockResolvedValue(data);
            });

            it('should call axios get with given url', () => {
                apis.getResource(url, onComplete);
                expect(axios.get).toBeCalledWith(url);
            });

            it('should call onComplete callback with response', async () => { // do not forget 'async'
                try {
                    await apis.getResource(url, onComplete); 
                    expect(onComplete).toBeCalledWith(data);
                } catch (err) {
                    console.log(err)
                }
            });
        });
    });
});

describe('Test Post Apis', (apiUrl, apiData) => {
    describe('postResource', (apiUrl, apiData) => {
        describe('with success', (apiUrl, apiData) => {
            const url = `https://irembo-system-design-backend.herokuapp.com/${apiUrl}`;
            const onComplete = jest.fn();
            const data = apiData;

            beforeEach(() => {
                axios.post.mockResolvedValue(data);
            });

            it('should call axios post with given url', () => {
                apis.postResource(url,data,{token: "123"}, onComplete);
                expect(axios.post).toBeCalledWith(url);
            });

            it('should call onComplete callback with response', async () => { 
                try {
                    await apis.postResource(url, onComplete);
                    expect(onComplete).toBeCalledWith(data);
                } catch (err) {
                    console.log(err)
                }
            });
        });
    });
});