'use strict'

require('dotenv').config()

module.exports = {
    'host': process.env.DB_HOST || 'localhost',
    'port': process.env.DB_PORT || 8080,
    'user': process.env.DB_USERNAME || 'root',
    'password': process.env.DB_PASSWORD || 'root',
    'database': process.env.DB_DATABASE || 'cram',
}