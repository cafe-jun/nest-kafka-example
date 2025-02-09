const { faker } = require('@faker-js/faker');
const fs = require('fs');
const path = require('path');
const dataCount = 1000000;

const generateDummyData = (count) => {
  return Array.from({ length: count }).map(() => ({
    title: faker.lorem.sentence(), // 랜덤 제목
    content: faker.lorem.paragraphs(2), // 랜덤 본문 (2개 문단)
    viewCount: faker.number.int({ min: 1, max: 100000 }), // 1~100000 랜덤 숫자
    commentCount: faker.number.int({ min: 1, max: 100000 }), // 1~100000 랜덤 숫자
    likeCount: faker.number.int({ min: 1, max: 100000 }), // 1~100000 랜덤 숫자
  }));
};

const dummyData = generateDummyData(dataCount); // 10만 개 생성
const dummyDataPath = path.resolve(`dummy/dummyData.json`);
// JSON 파일로 저장
fs.writeFileSync(dummyDataPath, JSON.stringify(dummyData, null, 2));

console.log(
  `🎉 ${dataCount} 개의 더미 데이터가 생성되었습니다! ✅ (dummyData.json)`,
);
