import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 데이터 삽입 시작...');

  // JSON 파일 읽기
  const data = JSON.parse(fs.readFileSync('dummy/dummyData.json', 'utf-8'));

  // Batch Insert (createMany 사용)
  const chunkSize = 10000; // 1만 개씩 나눠서 삽입
  for (let i = 0; i < data.length; i += chunkSize) {
    await prisma.post.createMany({
      data: data.slice(i, i + chunkSize),
      skipDuplicates: true, // 중복 데이터 무시
    });
    console.log(`✅ ${i + chunkSize}개 삽입 완료`);
  }

  console.log('🎉 모든 데이터 삽입 완료!');
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
