import jsPDF from 'jspdf';
import { TypeDescription } from '../types/mbti';

export const generateDetailedReport = (
  type: string,
  description: TypeDescription,
  scores: { [key: string]: number }
) => {
  // Create PDF with Unicode support
  const pdf = new jsPDF({
    orientation: 'p',
    unit: 'mm',
    format: 'a4',
    putOnlyUsedFonts: true,
    compress: true
  });

  let yPos = 20;
  const lineHeight = 7;
  const margin = 20;
  const pageWidth = 210;
  const contentWidth = pageWidth - 2 * margin;

  // Helper functions
  const addTitle = (text: string) => {
    pdf.setFontSize(16);
    pdf.text(text, margin, yPos);
    yPos += lineHeight * 1.5;
  };

  const addSubtitle = (text: string) => {
    pdf.setFontSize(14);
    pdf.text(text, margin, yPos);
    yPos += lineHeight;
  };

  const addParagraph = (text: string) => {
    pdf.setFontSize(12);
    const lines = pdf.splitTextToSize(text, contentWidth);
    pdf.text(lines, margin, yPos);
    yPos += lineHeight * lines.length;
  };

  const addList = (items: string[]) => {
    pdf.setFontSize(12);
    items.forEach(item => {
      const lines = pdf.splitTextToSize(`• ${item}`, contentWidth - 5);
      pdf.text(lines, margin + 5, yPos);
      yPos += lineHeight * lines.length;
    });
  };

  const checkPageBreak = (neededSpace: number) => {
    if (yPos + neededSpace > 270) {
      pdf.addPage();
      yPos = 20;
    }
  };

  // Cover Page
  pdf.setFontSize(24);
  pdf.text('MBTI 性格类型详细分析报告', margin, yPos);
  yPos += lineHeight * 2;

  pdf.setFontSize(18);
  pdf.text(`类型：${type} - ${description.title}`, margin, yPos);
  yPos += lineHeight * 2;

  pdf.setFontSize(14);
  pdf.text(description.subtitle, margin, yPos);
  yPos += lineHeight * 2;

  // Add date
  const currentDate = new Date().toLocaleDateString('zh-CN');
  pdf.text(`报告生成日期：${currentDate}`, margin, yPos);
  yPos += lineHeight * 3;

  // Add personality scores
  addTitle('性格维度得分');
  Object.entries(scores).forEach(([dim, score]) => {
    pdf.text(`${dim}: ${score}%`, margin, yPos);
    yPos += lineHeight;
  });
  yPos += lineHeight * 2;

  // New page for detailed content
  pdf.addPage();
  yPos = 20;

  // Core Description
  addTitle('核心特征描述');
  addParagraph(description.description);
  yPos += lineHeight * 2;

  // Characteristics
  checkPageBreak(lineHeight * (description.characteristics.length + 3));
  addTitle('性格特征');
  addList(description.characteristics);
  yPos += lineHeight * 2;

  // Strengths and Weaknesses
  checkPageBreak(lineHeight * (description.strengths.length + description.weaknesses.length + 5));
  addTitle('优势与挑战');
  addSubtitle('主要优势');
  addList(description.strengths);
  yPos += lineHeight;
  addSubtitle('潜在挑战');
  addList(description.weaknesses);
  yPos += lineHeight * 2;

  // Career Development
  checkPageBreak(lineHeight * (description.careers.length + 3));
  addTitle('职业发展建议');
  addList(description.careers);
  yPos += lineHeight * 2;

  // Learning Style
  checkPageBreak(lineHeight * (description.learningStyle.preferences.length + description.learningStyle.strategies.length + 5));
  addTitle('学习风格分析');
  addSubtitle('学习偏好');
  addList(description.learningStyle.preferences);
  yPos += lineHeight;
  addSubtitle('学习策略建议');
  addList(description.learningStyle.strategies);
  yPos += lineHeight * 2;

  // Communication Style
  checkPageBreak(lineHeight * (description.communicationStyle.strengths.length + description.communicationStyle.challenges.length + description.communicationStyle.tips.length + 7));
  addTitle('沟通风格分析');
  addSubtitle('沟通优势');
  addList(description.communicationStyle.strengths);
  yPos += lineHeight;
  addSubtitle('沟通挑战');
  addList(description.communicationStyle.challenges);
  yPos += lineHeight;
  addSubtitle('改进建议');
  addList(description.communicationStyle.tips);
  yPos += lineHeight * 2;

  // Work Style
  checkPageBreak(lineHeight * (description.workStyle.preferences.length + description.workStyle.challenges.length + 5));
  addTitle('工作风格分析');
  addSubtitle('工作偏好');
  addList(description.workStyle.preferences);
  yPos += lineHeight;
  addSubtitle('工作中需要注意');
  addList(description.workStyle.challenges);
  yPos += lineHeight * 2;

  // Stress Management
  checkPageBreak(lineHeight * (description.stressManagement.triggers.length + description.stressManagement.copingStrategies.length + 5));
  addTitle('压力管理指南');
  addSubtitle('压力源识别');
  addList(description.stressManagement.triggers);
  yPos += lineHeight;
  addSubtitle('应对策略');
  addList(description.stressManagement.copingStrategies);
  yPos += lineHeight * 2;

  // Personal Growth
  checkPageBreak(lineHeight * (description.growth.length + 3));
  addTitle('个人成长建议');
  addList(description.growth);
  yPos += lineHeight * 2;

  // Values and Interests
  checkPageBreak(lineHeight * (description.values.length + description.hobbies.length + 5));
  addTitle('价值观与兴趣');
  addSubtitle('核心价值观');
  addList(description.values);
  yPos += lineHeight;
  addSubtitle('推荐兴趣爱好');
  addList(description.hobbies);
  yPos += lineHeight * 2;

  // Relationships
  checkPageBreak(lineHeight * (description.relationships.strengths.length + description.relationships.challenges.length + 5));
  addTitle('人际关系分析');
  addSubtitle('关系中的优势');
  addList(description.relationships.strengths);
  yPos += lineHeight;
  addSubtitle('关系中的挑战');
  addList(description.relationships.challenges);
  yPos += lineHeight * 2;

  // Inspirational Figures
  checkPageBreak(lineHeight * (description.inspirationalFigures.length + 3));
  addTitle('性格相似的杰出人物');
  addList(description.inspirationalFigures);

  return pdf;
};