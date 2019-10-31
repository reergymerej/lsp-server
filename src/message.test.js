import * as mod from './message'

describe('splitHeaderAndContent', () => {
  it('should divide text into two chunks', () => {
    const input = 'asdf\r\nasdf\r\n\r\nqwer'
    const result = mod.splitHeaderAndContent(input)
    expect(result).toEqual([
      'asdf\r\nasdf',
      'qwer',
    ])
  })
})

describe('parseHeaders', () => {
  it('should split into each header', () => {
    const input = 'foo: bar\r\nContent-Length: 99'
    const result = mod.parseHeaders(input)
    expect(result).toEqual({
      foo: 'bar',
      'Content-Length': 99,
    })
  })
})

describe('parseContent', () => {
  it('should convert JSON to an object', () => {
    const data = {foo: 'bar', baz: 111}
    const input = JSON.stringify(data)
    const result = mod.parseContent(input)
    expect(result).toEqual(data)
  })
})

describe('parseMessage', () => {
  test('end to end', () => {
    const data = {bingo: 'bango', fish: {type: 'pompano'}}
    const input = `foo: bar\r\nContent-Length: 123\r\n\r\n${JSON.stringify(data)}`
    const result = mod.parseMessage(input)
    expect(result).toEqual({
      headers: {
        foo: 'bar',
        'Content-Length': 123,
      },
      body: data,
    })
  })
})
