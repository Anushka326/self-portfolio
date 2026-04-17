const fs = require('fs');

let content = fs.readFileSync('src/App.jsx', 'utf-8');

const extractSection = (name) => {
    const regex = new RegExp(`[ \\t]*\\{\\/\\* ${name} \\*\\/\\}[\\s\\S]*?<\\/section>`, 'g');
    const match = content.match(regex);
    if (match) {
        content = content.replace(regex, '');
        return match[0];
    }
    return '';
};

let hero = extractSection('Hero');
const about = extractSection('About');
const projects = extractSection('Projects');
const skills = extractSection('Skills');
const currentlyDoing = extractSection('Currently Doing');
const contact = extractSection('Contact');

const resumeRegex = /[ \t]*<a\\s[\\s\\S]*?download="Anushka_Resume\\.pdf"[\\s\\S]*?<\\/a>\\n/;
let resumeButton = '';
const resMatch = hero.match(resumeRegex);
if (resMatch) {
    resumeButton = `
        {/* Resume Section */}
        <section id="resume" className="px-6 py-12 max-w-5xl mx-auto flex justify-center items-center">
${resMatch[0].trim().replace(/^/gm, '          ')}
        </section>`;
    hero = hero.replace(resumeRegex, '');
}

const parts = content.split('<\\/nav>');
// Since split doesn't work if string literal has an escape block that doesn't match, simpler:
let navIndex = content.indexOf('</nav>');
if(navIndex !== -1) {
    let p1 = content.substring(0, navIndex + 6);
    let p2 = content.substring(navIndex + 6);
    
    let newContent = p1 + '\n\n' + hero + '\n\n' + about + '\n\n' + projects + '\n\n' + skills + '\n\n' + currentlyDoing + '\n' + resumeButton + '\n\n' + contact + p2;
    fs.writeFileSync('src/App.jsx', newContent);
}

