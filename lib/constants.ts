// 앱 전체에서 사용하는 상수들
export const APP_NAME = 'Encore Life';
export const APP_SLOGAN = '경험이 빛나는 새로운 시작';

// 네비게이션 메뉴
export const NAVIGATION_ITEMS = [
    { label: '채용공고', href: '/jobs' },
    { label: '커뮤니티', href: '/community' },
    { label: '취업가이드', href: '/guide' },
] as const;

// 직종 카테고리
export const JOB_CATEGORIES = [
    '사무/행정',
    '영업/마케팅',
    '생산/제조',
    '서비스/고객지원',
    '기술/IT',
    '교육/강사',
    '보안/시설관리',
    '운전/배송',
    '기타',
] as const;

//지역
export const REGIONS = [
    '서울',
    '경기',
    '인천',
    '부산',
    '대구',
    '광주',
    '대전',
    '울산',
    '세종',
    '강원',
    '충북',
    '충남',
    '전북',
    '전남',
    '경북',
    '경남',
    '제주',
] as const;

// 고용 형태
export const EMPLOYMENT_TYPES = [
    '정규직',
    '계약직',
    '파트타임',
    '프리랜서',
] as const;
