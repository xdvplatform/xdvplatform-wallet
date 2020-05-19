const libxmljs = require('libxmljs');
const fs = require('fs');
const { create, convert, createCB, fragmentCB } = require('xmlbuilder2');
const filename = process.env.XSD;
const xsd = libxmljs.parseXmlString(fs.readFileSync(`./${filename}`))
const xs = {
    xs: 'http://www.w3.org/2001/XMLSchema'
};
const path = '//xs:enumeration';
const nodes = xsd.find(path, xs);


let obj = {};
const json = nodes.map(el => {
   console.log(el.text())
    obj = {
        ...obj,
        [el.text().trim()]: el.attr('value').value(),
    }
});
fs.writeFileSync(`./${filename}.json`, JSON.stringify(obj))