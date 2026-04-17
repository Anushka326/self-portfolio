const fs = require('fs');

let content = fs.readFileSync('src/App.jsx', 'utf-8');

const projStart = '        {/* Projects */}\n        <section id="projects"';
const projEnd = '          </div>\n        </section>\n';

let pStartIdx = content.indexOf(projStart);
let pEndIdx = content.indexOf(projEnd, pStartIdx) + projEnd.length;

let projString = content.substring(pStartIdx, pEndIdx);
content = content.slice(0, pStartIdx) + content.slice(pEndIdx);

let insertIdx = content.indexOf('        {/* Skills */}');
content = content.slice(0, insertIdx) + projString + '\n' + content.slice(insertIdx);


const resumeBtnStart = '          <a \n            href="/Resume.pdf"';
const resumeBtnEnd = '            <span className="group-hover:animate-bounce text-xl">📄</span>\n          </a>\n';

let rStartIdx = content.indexOf(resumeBtnStart);
let rEndIdx = content.indexOf(resumeBtnEnd, rStartIdx) + resumeBtnEnd.length;

let resumeString = content.substring(rStartIdx, rEndIdx);
content = content.slice(0, rStartIdx) + content.slice(rEndIdx);

let resumeSection = '        {/* Resume Section */}\n        <section id="resume" className="px-6 py-20 max-w-5xl mx-auto flex justify-center items-center relative z-10">\n' + resumeString.replace(/^/gm, '  ') + '        </section>\n\n';

let contactIdx = content.indexOf('        {/* Contact */}');
content = content.slice(0, contactIdx) + resumeSection + content.slice(contactIdx);

fs.writeFileSync('src/App.jsx', content);
