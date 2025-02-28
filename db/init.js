const express = require('express')
const db = require('better-sqlite3')
const cors = require('cors')

db.prepare(
    "CREATE TABLE IF NOT EXISTS Test (id INTERGER PRIMARY KEY, name TEXT)"
).run();

