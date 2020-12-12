const fs = require('fs');
const request = require('supertest');
const app = require('../lib/utils/app.js');
const pool = require('../lib/utils/pool.js');
const Computer = require('../models/Computer.js');
const Application = require('../models/Application.js');


describe('app tests', () => {
  
  let computer;
  beforeEach (() => {      

    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  
  beforeEach (async() => {
  
    computer = await Computer.insert({
        
      brand: 'Apple', 
      model: 'Macbook Pro',
      url: 'apple.com'    
    });

  });

  afterAll(() => {
    return pool.end();
  });

  //POST TEST
  it('creates a application with POST', async() => {
    const res = await request(app)
      .post('/applications')
      .send({
        // computerId: '1',
        name: 'Garageband'
            
      });
    
    console.log(res.body);
    expect(res.body).toEqual({
      id: '1',      
      name: 'Garageband',   
      // computerId: '1'
    });
  });

  //GET TEST
  it('finds applications from table with GET', async() => {
    const res = await request(app)
      .get('/applications');

    expect(res.body).toEqual(res.body);
  });

  //VERY PLAIN GET BY ID TEST
  it('finds applications from table by ID with GET', async() => {
    const application = await Application.insert({ 
      name: 'Garageband',
      computerId: '1'  
    });

    const response = await request(app)
      .get(`/applications/${application.id}`);

    console.log(`/applications/${computer.id}`);
    expect(response.body).toEqual(application);
  });

  // it('finds a computer with associated applications by id via GET', async() => {
  //   await Promise.all([
  //     { name: 'Garageband' },
  //     { name: 'VScode' }
      
  //   ].map(application => Application.insert(application)));

  //   const computer = await Computer.insert({
  //     brand: 'Apple', 
  //     model: 'Macbook Pro',
  //     url: 'apple.com',  
  //     applications: ['Garageband', 'VScode']
  //   });

  //   const response = await request(app)
  //     .get(`/computers/${computer.id}`);
    
  //   expect(response.body).toEqual({
  //     ...computer,
  //     applications: ['Garageband', 'VScode']
  //   });
  // });

  // //GET BY ID WITH application TEST
  // it('finds a computer by id and associated applications via GET', async() => {
  //   const computer = await Computer.insert({
  //     brand: 'Apple', 
  //     model: 'Macbook Pro',
  //     url: 'apple.com'
  //   });

  //   const applications = await Promise.all([
  //     { name: 'GarageBand', computerId: computer.id },
  //     { name: 'VScode', computerId: computer.id },
  //   ].map(application => Application.insert(application)));    

  //   const res = await request(app)
  //     .get(`/computers/${computer.id}`);
      
  //   expect(res.body).toEqual({
  //     ...computer,
  //     applications: expect.arrayContaining(applications)
  //   });
  // });

  //PUT TEST
  it('updates applications from table by ID with PUT', async() => {
    const application = await Application.insert({ 
      name: 'Garageband', 
      // computerId: 1,
    });

    const response = await request(app)
      .put(`/applications/${application.id}`)
      .send({
        name: 'GaragebandUPDATE', 
        // computerId: '1',
      });

    console.log(response.body);
    expect(response.body).toEqual({
      ...application,
      name: 'GaragebandUPDATE', 
      // computerId: '1',
    });
  });

  //DELETE TEST
  it('updates computers from table by ID with PUT', async() => {
    const application = await Application.insert({ 
      name: 'Garageband', 
      // computerId: '1',
    });

    const response = await request(app)
      .delete(`/applications/${application.id}`);

    console.log(`/applications/${application.id}`);
    expect(response.body).toEqual(application);
  });

});

