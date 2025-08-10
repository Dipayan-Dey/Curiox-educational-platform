import {createTransport} from "nodemailer"

// ✔ Recommended fix: Accept object like you're passing it
const sendMail = async ({ to, subject, data }) => {
  const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .email-wrapper {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            position: relative;
        }
        
        .email-wrapper::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c);
            background-size: 300% 100%;
            animation: gradientShift 3s ease infinite;
        }
        
        @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
        
        .container {
            padding: 50px 40px;
            text-align: center;
            position: relative;
        }
        
        .header-decoration {
            width: 80px;
            height: 80px;
            margin: 0 auto 30px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }
        
        .header-decoration::before {
            content: '🔐';
            font-size: 36px;
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
        }
        
        .header-decoration::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 2px solid transparent;
            background: linear-gradient(45deg, #667eea, #764ba2) border-box;
            mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
            mask-composite: exclude;
            animation: rotateBorder 4s linear infinite;
        }
        
        @keyframes rotateBorder {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        h1 {
            color: #e74c3c;
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 20px;
            text-shadow: 0 2px 4px rgba(231, 76, 60, 0.2);
            position: relative;
        }
        
        h1::after {
            content: '';
            position: absolute;
            bottom: -8px;
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
            height: 3px;
            background: linear-gradient(90deg, #e74c3c, #c0392b);
            border-radius: 2px;
        }
        
        p {
            margin-bottom: 20px;
            color: #555;
            font-size: 16px;
            line-height: 1.6;
        }
        
        .greeting-text {
            font-size: 18px;
            color: #333;
            margin-bottom: 30px;
            font-weight: 500;
        }
        
        .name-highlight {
            color: #667eea;
            font-weight: 700;
            background: linear-gradient(120deg, transparent 0%, rgba(102, 126, 234, 0.1) 50%, transparent 100%);
            padding: 2px 8px;
            border-radius: 6px;
        }
        
        .otp-section {
            background: linear-gradient(135deg, #f8f9ff 0%, #e8ecff 100%);
            border: 2px solid #667eea;
            border-radius: 20px;
            padding: 40px 30px;
            margin: 40px 0;
            position: relative;
            overflow: hidden;
        }
        
        .otp-section::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(102, 126, 234, 0.05) 0%, transparent 70%);
            animation: pulse 3s ease-in-out infinite;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.5; }
            50% { transform: scale(1.1) rotate(180deg); opacity: 0.8; }
        }
        
        .otp-label {
            font-size: 14px;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 15px;
            font-weight: 600;
        }
        
        .otp {
            font-size: 48px;
            color: #7b68ee;
            font-weight: 900;
            font-family: 'Courier New', Monaco, monospace;
            letter-spacing: 12px;
            margin: 0;
            text-shadow: 0 4px 8px rgba(123, 104, 238, 0.3);
            position: relative;
            z-index: 1;
            background: linear-gradient(135deg, #7b68ee 0%, #9d7ff5 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
        }
        
        .decorative-elements {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            pointer-events: none;
            overflow: hidden;
        }
        
        .floating-shape {
            position: absolute;
            background: rgba(102, 126, 234, 0.1);
            border-radius: 50%;
            animation: float 6s ease-in-out infinite;
        }
        
        .shape-1 {
            width: 60px;
            height: 60px;
            top: 10%;
            left: 10%;
            animation-delay: 0s;
        }
        
        .shape-2 {
            width: 40px;
            height: 40px;
            top: 20%;
            right: 15%;
            animation-delay: 2s;
        }
        
        .shape-3 {
            width: 80px;
            height: 80px;
            bottom: 15%;
            left: 20%;
            animation-delay: 4s;
        }
        
        .shape-4 {
            width: 50px;
            height: 50px;
            bottom: 25%;
            right: 10%;
            animation-delay: 1s;
        }
        
        @keyframes float {
            0%, 100% { 
                transform: translateY(0px) rotate(0deg);
                opacity: 0.5;
            }
            50% { 
                transform: translateY(-20px) rotate(180deg);
                opacity: 0.8;
            }
        }
        
        .security-badge {
            display: inline-flex;
            align-items: center;
            background: rgba(40, 167, 69, 0.1);
            color: #28a745;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            margin-top: 20px;
            border: 1px solid rgba(40, 167, 69, 0.2);
        }
        
        .security-badge::before {
            content: '🛡️';
            margin-right: 6px;
        }
        
        @media (max-width: 600px) {
            .container {
                padding: 30px 20px;
            }
            
            .otp {
                font-size: 36px;
                letter-spacing: 8px;
            }
            
            h1 {
                font-size: 28px;
            }
            
            .email-wrapper {
                margin: 10px;
            }
        }
        
        /* Ensure email client compatibility */
        @media screen and (max-width: 480px) {
            .floating-shape {
                display: none;
            }
        }
    </style>
</head>
<body>
    <div class="email-wrapper">
        <div class="container">
            <!-- Decorative floating elements -->
            <div class="decorative-elements">
                <div class="floating-shape shape-1"></div>
                <div class="floating-shape shape-2"></div>
                <div class="floating-shape shape-3"></div>
                <div class="floating-shape shape-4"></div>
            </div>
            
            <!-- Header icon -->
            <div class="header-decoration"></div>
            
            <!-- Your original content with enhanced styling -->
            <h1>OTP Verification</h1>
            <h4>Send From CurioX </h4>
            <p>Founder Dipayan Dey </p>
            
            <div class="greeting-text">
                Hello <span class="name-highlight">${data.userName}</span> your (One-Time Password) for your account verification is.
            </div>
            
            <div class="otp-section">
                <div class="otp-label">Verification Code</div>
                <div class="otp">${data.otp}</div>
                <div class="security-badge">Secure & Encrypted</div>
            </div>
        </div>
    </div>
</body>
</html>`;




  await transport.sendMail({
    from: process.env.EMAIL,
    to,
    subject,
    html,
  });
};



export default sendMail


export const WelcomeMail=async ({ to, subject, username })=>{
 const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to CurioX</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            animation: backgroundShift 8s ease infinite;
        }
        
        @keyframes backgroundShift {
            0%, 100% { background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%); }
            50% { background: linear-gradient(135deg, #f093fb 0%, #667eea 50%, #764ba2 100%); }
        }
        
        .email-wrapper {
            max-width: 650px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
            position: relative;
            backdrop-filter: blur(10px);
        }
        
        .email-wrapper::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 6px;
            background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7);
            background-size: 400% 100%;
            animation: gradientFlow 4s ease infinite;
        }
        
        @keyframes gradientFlow {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
        
        .header-section {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .header-section::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            animation: headerPulse 6s ease-in-out infinite;
        }
        
        @keyframes headerPulse {
            0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.5; }
            50% { transform: scale(1.1) rotate(180deg); opacity: 0.8; }
        }
        
        .logo-container {
            width: 100px;
            height: 100px;
            margin: 0 auto 25px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            z-index: 2;
            backdrop-filter: blur(10px);
            border: 3px solid rgba(255, 255, 255, 0.3);
            animation: logoFloat 3s ease-in-out infinite;
        }
        
        @keyframes logoFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        
        .logo-container::before {
            content: '🎓';
            font-size: 48px;
            filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
        }
        
        .brand-name {
            color: #ffffff;
            font-size: 42px;
            font-weight: 900;
            margin-bottom: 10px;
            text-shadow: 0 4px 8px rgba(0,0,0,0.3);
            position: relative;
            z-index: 2;
            letter-spacing: 2px;
        }
        
        .tagline {
            color: rgba(255, 255, 255, 0.9);
            font-size: 18px;
            font-weight: 300;
            font-style: italic;
            position: relative;
            z-index: 2;
        }
        
        .container {
            padding: 50px 40px;
            position: relative;
        }
        
        .welcome-section {
            text-align: center;
            margin-bottom: 40px;
        }
        
        .welcome-title {
            color: #333;
            font-size: 36px;
            font-weight: 700;
            margin-bottom: 15px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .user-greeting {
            font-size: 24px;
            color: #555;
            margin-bottom: 30px;
            font-weight: 500;
        }
        
        .username {
            color: #667eea;
            font-weight: 700;
            background: linear-gradient(120deg, transparent 0%, rgba(102, 126, 234, 0.1) 50%, transparent 100%);
            padding: 4px 12px;
            border-radius: 8px;
            display: inline-block;
        }
        
        .description-card {
            background: linear-gradient(135deg, #f8f9ff 0%, #e8ecff 100%);
            border: 2px solid transparent;
            background-clip: padding-box;
            border-radius: 20px;
            padding: 40px;
            margin: 40px 0;
            position: relative;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.1);
        }
        
        .description-card::before {
            content: '';
            position: absolute;
            inset: 0;
            padding: 2px;
            background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
            border-radius: 20px;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: subtract;
            animation: borderGlow 3s ease infinite;
        }
        
        @keyframes borderGlow {
            0%, 100% { opacity: 0.7; }
            50% { opacity: 1; }
        }
        
        .description-title {
            font-size: 28px;
            font-weight: 700;
            color: #333;
            margin-bottom: 20px;
            text-align: center;
            position: relative;
        }
        
        .description-title::after {
            content: '✨';
            position: absolute;
            right: -40px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 24px;
            animation: sparkle 2s ease infinite;
        }
        
        @keyframes sparkle {
            0%, 100% { transform: translateY(-50%) scale(1); opacity: 0.7; }
            50% { transform: translateY(-50%) scale(1.2); opacity: 1; }
        }
        
        .description-text {
            font-size: 18px;
            line-height: 1.8;
            color: #555;
            text-align: center;
            margin-bottom: 30px;
            position: relative;
            z-index: 1;
        }
        
        .highlight-text {
            color: #667eea;
            font-weight: 600;
            background: linear-gradient(120deg, transparent 0%, rgba(102, 126, 234, 0.1) 50%, transparent 100%);
            padding: 2px 6px;
            border-radius: 4px;
        }
        
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }
        
        .feature-item {
            background: rgba(255, 255, 255, 0.7);
            padding: 20px;
            border-radius: 12px;
            text-align: center;
            border: 1px solid rgba(102, 126, 234, 0.2);
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        .feature-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(102, 126, 234, 0.2);
        }
        
        .feature-icon {
            font-size: 32px;
            margin-bottom: 10px;
            display: block;
        }
        
        .feature-text {
            font-weight: 600;
            color: #333;
            font-size: 14px;
        }
        
        .founder-section {
            background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
            color: white;
            padding: 35px;
            border-radius: 16px;
            margin: 40px 0;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .founder-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="20" r="1.5" fill="rgba(255,255,255,0.1)"/><circle cx="40" cy="80" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="70" cy="60" r="2.5" fill="rgba(255,255,255,0.1)"/></svg>');
            animation: starsMove 20s linear infinite;
        }
        
        @keyframes starsMove {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100px); }
        }
        
        .founder-label {
            font-size: 16px;
            opacity: 0.8;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-weight: 300;
        }
        
        .founder-name {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 15px;
            position: relative;
            z-index: 1;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        
        .founder-title {
            font-size: 16px;
            opacity: 0.9;
            font-style: italic;
            position: relative;
            z-index: 1;
        }
        
        .cta-section {
            text-align: center;
            margin-top: 40px;
        }
        
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 16px 40px;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            font-size: 16px;
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        .cta-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            transition: left 0.5s ease;
        }
        
        .cta-button:hover::before {
            left: 100%;
        }
        
        .cta-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
        }
        
        .decorative-elements {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            pointer-events: none;
            overflow: hidden;
        }
        
        .floating-shape {
            position: absolute;
            border-radius: 50%;
            animation: floatAround 8s ease-in-out infinite;
        }
        
        .shape-1 {
            width: 80px;
            height: 80px;
            background: rgba(102, 126, 234, 0.1);
            top: 10%;
            left: 5%;
            animation-delay: 0s;
        }
        
        .shape-2 {
            width: 60px;
            height: 60px;
            background: rgba(118, 75, 162, 0.1);
            top: 70%;
            right: 10%;
            animation-delay: 3s;
        }
        
        .shape-3 {
            width: 40px;
            height: 40px;
            background: rgba(240, 147, 251, 0.1);
            top: 40%;
            left: 85%;
            animation-delay: 6s;
        }
        
        @keyframes floatAround {
            0%, 100% { 
                transform: translateY(0px) translateX(0px) rotate(0deg);
                opacity: 0.5;
            }
            25% { 
                transform: translateY(-20px) translateX(10px) rotate(90deg);
                opacity: 0.8;
            }
            50% { 
                transform: translateY(-10px) translateX(-10px) rotate(180deg);
                opacity: 0.6;
            }
            75% { 
                transform: translateY(10px) translateX(5px) rotate(270deg);
                opacity: 0.7;
            }
        }
        
        .footer {
            text-align: center;
            padding: 30px;
            background: #f8f9fa;
            color: #666;
            font-size: 14px;
            border-top: 1px solid #e9ecef;
        }
        
        @media (max-width: 600px) {
            .container {
                padding: 30px 20px;
            }
            
            .brand-name {
                font-size: 32px;
            }
            
            .welcome-title {
                font-size: 28px;
            }
            
            .user-greeting {
                font-size: 20px;
            }
            
            .description-title {
                font-size: 24px;
            }
            
            .description-text {
                font-size: 16px;
            }
            
            .founder-name {
                font-size: 26px;
            }
            
            .email-wrapper {
                margin: 10px;
            }
            
            .features-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="email-wrapper">
        <!-- Header Section -->
        <div class="header-section">
            <div class="logo-container"></div>
            <h1 class="brand-name">CurioX</h1>
            <p class="tagline">Curiosity meets Experience</p>
        </div>
        
        <div class="container">
            <!-- Decorative floating elements -->
            <div class="decorative-elements">
                <div class="floating-shape shape-1"></div>
                <div class="floating-shape shape-2"></div>
                <div class="floating-shape shape-3"></div>
            </div>
            
            <!-- Welcome Section -->
            <div class="welcome-section">
                <h1 class="welcome-title">Welcome To CurioX!</h1>
                <p class="user-greeting">Hello, <span class="username">${username}</span></p>
            </div>
            
            <!-- Description Card -->
            <div class="description-card">
                <h2 class="description-title">Transform Your Potential</h2>
                <p class="description-text">
                    Transform your potential into expertise with our <span class="highlight-text">interactive e-learning platform</span>. 
                    Learn from <span class="highlight-text">industry experts</span> and build 
                    <span class="highlight-text">real-world skills</span> that matter in today's competitive landscape.
                </p>
                
             
            </div>
            
            <!-- Founder Section -->
            <div class="founder-section">
                <div class="founder-label">Founded By</div>
                <div class="founder-name">Dipayan Dey</div>
                <div class="founder-title">Visionary & Education Innovator</div>
            </div>
            
            <!-- Call to Action -->
            <div class="cta-section">
                <a href="#" class="cta-button">Start Your Learning Journey</a>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <p>© 2024 CurioX. Empowering learners worldwide.</p>
            <p>Where curiosity meets experience, and dreams become reality.</p>
        </div>
    </div>
</body>
</html>`;

    await transport.sendMail({
    from: process.env.EMAIL,
    to,
    subject,
    html,
  });
}