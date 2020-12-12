const fs = require('fs');
const request = require('supertest');
const app = require('../lib/utils/app.js');
const pool = require('../lib/utils/pool.js');
const Computer = require('../models/Computer');
const Application = require('../models/Application.js');



describe('app tests', () => {
    
  beforeEach (() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });
  afterAll(() => {
    return pool.end();
  });
  //POST TEST
  it('creates a computer with POST', async() => {
    const res = await request(app)
      .post('/computers')
      .send({
        brand: 'Apple', 
        model: 'Macbook Pro',
        url: 'apple.com'       
      });
    
    console.log(res.body);
    expect(res.body).toEqual({
      id: expect.anything(),
      brand: 'Apple', 
      model: 'Macbook Pro',
      url: 'apple.com'
    });
  });
  //GET TEST
  it('finds computers from table with GET', async() => {
    const res = await request(app)
      .get('/computers');

    expect(res.body).toEqual(res.body);
  });

  //GET BY ID TEST
  it('finds a computer with all associated applications by id via GET', async() => {
    await Promise.all([
      { name: 'Garageband' },
      { name: 'VScode' }
      
    ].map(application => Application.insert(application)));

    const computer = await Computer.insert({
      brand: 'Apple', 
      model: 'Macbook Pro',
      url: 'apple.com',  
      applications: ['Garageband', 'VScode']
    });

    const response = await request(app)
      .get(`/computers/${computer.id}`);
    
      console.log(response.body)
    expect(response.body).toEqual({
      ...computer,
      applications: ['Garageband', 'VScode']
    });
  });

  //PUT TEST
  it('updates computers from table by ID with PUT', async() => {
    const computer = await Computer.insert({ 
      brand: 'Apple', 
      model: 'Macbook Pro',
      url: 'apple.com' });

    const response = await request(app)
      .put(`/computers/${computer.id}`)
      .send({
        brand: 'Matrix RELOADED', 
        model: 'Macbook Pro',
        url: 'apple.com'
      });

    console.log(`/computers/${computer.id}`);
    expect(response.body).toEqual({
      ...computer,
      brand: 'Matrix RELOADED', 
      model: 'Macbook Pro'
    });
  });
  //DELETE TEST
  it('updates computers from table by ID with PUT', async() => {
    const computer = await Computer.insert({ 
      brand: 'Apple', 
      model: 'Macbook Pro',
      url: 'apple.com' });

    const response = await request(app)
      .delete(`/computers/${computer.id}`);

    console.log(`/computers/${computer.id}`);
    expect(response.body).toEqual(computer);
  });

});
