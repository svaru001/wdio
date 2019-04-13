const Mail = require('../pages/mail')

describe('Mail', () => {
  it('requires fields', () => {
    Mail.open()
    should.Throw(() => Mail.send('', null, null, null, 500))
    browser.getTitle().should.equal('Send mail')
  })

  it('sends unicode', () => {
    const recipient = uuidv4() + '@example.org'
    const content = '日本'
    Mail.open()
    browser.getTitle().should.equal('Send mail')
    browser.saveAndDiffScreenshot('Send mail')
    Mail.send(recipient, 'Unicode mail', content)
    Mail.result.getText().should.equal('Mail sent!')
    browser.getTitle().should.equal('Mail sent!')
    browser.saveAndDiffScreenshot('Mail sent')
    Mail.return()
    browser.getTitle().should.equal('Send mail')
    browser.mailhog('latestTo', recipient).text.should.equal(content)
  })
})
