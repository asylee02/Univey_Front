/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        text_color:'#5A4978',
        sub_text_color:'#989EA8',
        sub_text_color_2: '#ECE8E1',
        main_color:'#00008A',
        highligth:'#F29F05',
        line_color:'#EDF1F5',
        box_color_1:'#4A4AB4',
        box_color_2:'#2E64B5',
        sub_text_color_4: "#F27F0C",
        holiday: "#17A1FA",
        background: "#E8ECF2",
        sub_line_color:'#C0D0EF'
      },
      height:{
        xxl: '34rem',
        carousel: '36rem',
        trend_carousel: '32rem',
        trend_board:'40rem'
      },
      width:{
        line: '71%',
        qr_cutting: '46%'
      },
      border:{
        xs : '5px'
      },     
      margin:{
        left : '14%',
        leftsm : '6%',
        leftxl : '21.5%'
      },
      borderWidth: {
        '1': '1px',
        text_color: "#5A4978",
        sub_text_color: "#989EA8",
        sub_text_color_2: "#ECE8E1",
        sub_text_color_4: "#F27F0C",
        main_color: "#00008A",
        highligth: "#F29F05",
        calendar_weekend: "#17A1FA",
        survey_border_color: "#777B83",
        question_card_bg: "#E8ECF2",
        question_card_grey: "#C2C6CE",
      },
    },
  },
  plugins: [],
};
