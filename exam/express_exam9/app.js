const express = require('express');
const nunjucks = require('nunjucks');
const multer = require('multer');
const path = require('path');

const app = express();

app.set("view engine", "html");
nunjucks.configure(path.join(__dirname, "views"), {
	express: app,
	watch: true,
});

const upload = multer({
	storage : multer.diskStorage({
		destination(req, file, done) {
			done(null,path.join(__dirname,"upload"));
		},
		filename(req, file, done) {
			const ext = path.extname(file.originalname);
			const filename = path.basenabe(file.originalname, ext);
			const newFileName = `${filename}_${Date,now()}${ext}`;
			done(null, newFileName);
		}
		}),
	limits : {fileSize : 10*1024*1204},
});

app.get("/file1", (req, res) => {
	return res.render("file1");
});

app.post("/file1",upload.single("image"), (req, res) => {
	console.log(req.file);
	return res.send("");
});

app.get("/file2",(req, res) => {
	return res.render("file2");
});

app.post("/file2", upload.array("images"), (req, res) => {
	//복수개 파일 업로드 -> req.files
	console.log(req.files);
	
	return res.send("");
});

app.get("/file3", (req, res) => {
	return res.render("file3");
});

app.post("/file3", upload.fields([{ name : "image1"}, { name : "image2"}]), (req, res) => {
	console.log(req.files);
	return res.send("");
});

app.get("/", (req, res) => {
	const list = [
                { city : '인천', sigugun : '계양구'},
                { city : '인천', sigugun : '서구'},
                { city : '인천', sigugun : '미추홀구'},
				{ city : '서울', sigugun : '양천구'},
            ];
			// 출력헤더 -> 자원공유 허용
	res.header("Access-Control-Allow-Origin","*");
	return res.json(list);
});

app.listen(3000,() => {
	console.log("서버대기중..");
});
