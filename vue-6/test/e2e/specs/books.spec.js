var nightwatch = require('nightwatch');
module.exports = {
    '搜索框测试': function (browser) {
      // automatically uses dev Server port from /config.index.js
      // default: http://localhost:8080
      // see nightwatch.conf.js
      const devServer = browser.globals.devServerURL
      const terms = '大数据'
      browser
        .url(devServer)
        .waitForElementVisible('body',30000)
        .setValue('input[type="search"]',[terms,browser.Keys.ENTER])
        .assert.containsText('.book-name',terms)
        .setValue('input[type="search"',['不存在的数据',browser.Keys.ENTER])
        .assert.elementPresent('.empty-holder')
        .end()
       
    },
    '行选择测试': function (browser) {
        const devServer = browser.globals.devServerURL
    const isbns=['978-7-121-28410-6','978-7-121-28817-3','978-7-121-28413-7']//对element的定位很重要，这里只能是个体
    browser.url(devServer)
    .waitForElementVisible('body',3000)
    .assert.elementNotPresent('.selection')
    .assert.elementNotPresent('#btn-delete')
    .assert.cssClassNotPresent(`tr[data-isbn="${isbns[0]}"]`, 'book-selected')
    .assert.cssClassNotPresent(`tr[data-isbn="${isbns[1]}"]`, 'book-selected')
    .assert.cssClassNotPresent(`tr[data-isbn="${isbns[2]}"]`, 'book-selected')
    .click(`input[type="checkbox"][data-isbn="${isbns[0]}"]`)
    .click(`input[type="checkbox"][data-isbn="${isbns[1]}"]`)
    .click(`input[type="checkbox"][data-isbn="${isbns[2]}"]`)
    .assert.containsText('.selection', '3')
    .assert.elementPresent('#btn-delete')
    .assert.cssClassPresent(`tr[data-isbn="${isbns[0]}"]`, 'book-selected')
    .assert.cssClassPresent(`tr[data-isbn="${isbns[1]}"]`, 'book-selected')
    .assert.cssClassPresent(`tr[data-isbn="${isbns[2]}"]`, 'book-selected')
    .end()
    },
    '点击列头时应该进行排序':function(browser){
      const devServer = browser.globals.devServerURL
      const colName='th[data-col="name"]'
      const colCat='th[data-col="category"]'
      const colPub='th[data-col="published"]'
      const sortingClass='sorting'
      const asc=' span.asc'
      const desc=' span.desc'
      browser.url(devServer)
      .waitForElementVisible('body',3000)
      .assert.cssClassNotPresent(colName, sortingClass)
      .assert.cssClassNotPresent(colCat, sortingClass)
      .assert.cssClassNotPresent(colPub, sortingClass)
      .assert.elementNotPresent('${colName}>div>span')
      .assert.elementNotPresent('${colCat}>div>span')
      .assert.elementNotPresent('${colPub}>div>span')
      .getAttribute('table tbody tr:first-child','data-isbn',result=>{
        console.log(result.value)
        browser.assert.equal(result.value,'978-7-121-28410-6')//无排序
      })
      .click(colName)//对名称进行排序
      .assert.visible('th[data-col="name"] span.asc')
      .getAttribute('table tbody tr:first-child','data-isbn',result=>{
        browser.assert.equal(result.value,'978-7-121-27944-7')//升序
      })
      .click(colName)//反向排序
      .getAttribute('table tbody tr:first-child','data-isbn',result=>{
        browser.assert.equal(result.value,'978-7-121-27822-8')//降序
      })
      .assert.visible('th[data-col="name"] span.desc')
      .assert.cssClassPresent(colName, sortingClass)
      .assert.cssClassNotPresent(colCat, sortingClass)
      .assert.cssClassNotPresent(colPub, sortingClass)
      .click(colCat) // 对类别进行排序
      .assert.visible(`th[data-col="category"] span.desc`)
      .assert.cssClassPresent(colCat, sortingClass)
      .assert.cssClassNotPresent(colName, sortingClass)
      .assert.cssClassNotPresent(colPub, sortingClass)
      .end()
    }
  }