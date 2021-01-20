const mongoose = require('mongoose');
const Test = mongoose.model(`Test`);
const { join, parse } = require('path');
const  {createWriteStream } = require('fs');


const addTest= async (args) => {
    let test = new Test({
        name: args.name,
    });
    await test.save();
    return test;
}

const upload = async (file) => {
    const {createReadStream, filename, mimetype} = await file;
    const stream = createReadStream();
    // const file = storeUpload({stream, filename, mimetype});
    let {
        ext, name
    } = parse(filename);
    name = name.replace(/([^a-z0-9 ]+)/gi, '-').replace(' ', '_');

    let serverFile = join(__dirname, `../../public/images/${name}-${Date.now()}${ext}`);

    let writeStream = await createWriteStream(serverFile);
    await stream.pipe(writeStream);

    serverFile = `http://localhost:4000/${serverFile.split('images')[1]}`;

    return serverFile;

    return file;
}

module.exports={
    addTest,
    upload
}
