import { Language } from '../types';

export const gradeLevels = [
  { value: -3, label: 'KG 1', amharicLabel: 'KG 1' },
  { value: -2, label: 'KG 2', amharicLabel: 'KG 2' },
  { value: -1, label: 'KG 3', amharicLabel: 'KG 3' },
  ...Array.from({ length: 8 }, (_, index) => {
    const grade = index + 1;
    return {
      value: grade,
      label: `Grade ${grade}`,
      amharicLabel: `${grade}ኛ ክፍል`,
    };
  }),
];

export const getGradeLabel = (grade: number, language: Language): string => {
  const option = gradeLevels.find((level) => level.value === grade);
  return option
    ? language === 'am' ? option.amharicLabel : option.label
    : language === 'am' ? `${grade}ኛ ክፍል` : `Grade ${grade}`;
};
