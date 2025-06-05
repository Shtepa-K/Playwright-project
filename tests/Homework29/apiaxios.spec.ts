import { test, expect } from '@playwright/test';
import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

test('GET users', async () => {
  const response = await axios.get(`${ BASE_URL }/users`);
    console.log(response.data);
    expect(response.status).toEqual(200); 
})

test('GET posts', async () => {
    const response = await axios.get(`${BASE_URL}/posts`, {
         params:{ title: 'quaerat velit veniam amet cupiditate aut numquam ut sequi'}
    });
    console.log(response.data);
    expect(response.status).toEqual(200); 
})

test('POST posts', async () => {
    const newpost = {
    userId: 10,
    title: 'test title',
    body: 'test body'
    }
    const response = await axios.post(`${ BASE_URL }/posts`, newpost);
    console.log(response.data);
    expect(response.status).toEqual(201); 

    const createpost = response.data
    expect(createpost).toMatchObject(newpost); 
})

test('GET photos', async () => {
    const response = await axios.get(`${BASE_URL}/photos`, {
        params:{id: 100}
    });
    console.log(response.data);
    expect(response.status).toEqual(200); 
})

test('GET comments', async () => {
    const response = await axios.get(`${BASE_URL}/comments`, {
       params:{postId: 20, name: 'non sit ad culpa quis' } 
    })
    console.log(response.data);
    expect(response.status).toEqual(200); 
})

test('POST comments', async () => {
    const newcomments = {
    postId: 20,
    name: 'non sit ad culpa quis',
    email: 'test@lavada.biz',
    body: 'test body'
    }
    const response = await axios.post(`${ BASE_URL }/comments`, newcomments);
    console.log(response.data);
    expect(response.status).toEqual(201); 

    const createnewcomments = response.data
    expect(createnewcomments).toMatchObject(newcomments); 
})