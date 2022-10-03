import React from 'react'
import axios from "axios";

const token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9maWxlIjp7InByb2ZpbGVfaWQiOjEsInByb2ZpbGVfbmFtZSI6IlRlc3RQcm9maWxlMTIzIiwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJGtSZXR3ZHJQaDJmdnF1ek9BaUhJRWVXWHgydFlUdzVhWEpIcmtrbUdMMzBHTUg1eUxhenk2IiwiYmlydGgiOiJ0ZXN0IGJpcnRoIiwiY3VycmVudEhhc2hlZFJlZnJlc2hUb2tlbiI6bnVsbCwiaXNBY3RpdmF0ZSI6dHJ1ZSwicm9sZSI6IlVzZXIiLCJwZXJtaXNzaW9uIjpudWxsLCJjcmVhdGVkQXQiOiIyMDIyLTEwLTAyVDA4OjU1OjA2LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIyLTEwLTAyVDA4OjU1OjA2LjAwMFoiLCJkZWxldGVkQXQiOm51bGx9LCJpYXQiOjE2NjQ3MTA4MjEsImV4cCI6MTY2NDcxNDQyMX0.NvZx7zt0Cttpspkf7BTHUMd8JbqPNa2kQyvwFpsxbSM"
const API_URL = "localhost:4321/api/";
const header = `Authorization: Bearer ${token}`;
function HomeService() {
  const getAllPosts = () =>{
    const url = `${API_URL}/post/all`;
    return axios.post(url,{ headers: {"Authorization" : `Bearer ${token}`} }).then(response => response.data);
  }
}

export default HomeService