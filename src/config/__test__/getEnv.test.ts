import { v4 as uuidv4 } from 'uuid'
import { describe, it, expect, beforeEach, afterAll } from 'vitest'
import { getEnv } from '../getEnv'

describe('getEnv', () => {
    const originalEnv = process.env
    beforeEach(() => {
        process.env = { ...originalEnv }
    })
    afterAll(() => {
        process.env = originalEnv
    })
    it('gets the value of a key defined in .env', () => {
        // setup
        const testValue = uuidv4()
        process.env.TESTVALUE = testValue

        // execute
        const actual = getEnv('TESTVALUE')

        // assert
        expect(actual).toBe(testValue)
    })
    it('returns the default value if the requested key is not defined in .env', () => {
        // setup
        const defaultValue = uuidv4()

        // execute
        const actual = getEnv(uuidv4(), defaultValue)

        // assert
        expect(actual).toBe(defaultValue)
    })
    it('returns empty string if the requested key is not defined and in .env no default value was provided', () => {
        // execute
        const actual = getEnv(uuidv4())

        // assert
        expect(actual).toBe('')
    })
})