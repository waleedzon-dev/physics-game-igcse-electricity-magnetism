// رسم الرسوم التوضيحية للفيزياء
function drawPhysicsIllustration(questionIndex) {
    const canvas = document.getElementById('physicsCanvas');
    const ctx = canvas.getContext('2d');
    
    // مسح الرسم السابق
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // تعيين الرسومات حسب السؤال
    switch(questionIndex) {
        case 0: drawElectricCurrent(ctx, canvas); break;
        case 1: drawVoltage(ctx, canvas); break;
        case 2: drawResistance(ctx, canvas); break;
        case 3: drawWireComparison(ctx, canvas); break;
        case 4: drawOhmsLaw(ctx, canvas); break;
        case 5: drawCurrentVoltage(ctx, canvas); break;
        case 6: drawMagneticField(ctx, canvas); break;
        case 7: drawMagneticFieldLines(ctx, canvas); break;
        case 8: drawForceOnConductor(ctx, canvas); break;
        case 9: drawParallelConductor(ctx, canvas); break;
    }
}

// رسم التيار الكهربائي
function drawElectricCurrent(ctx, canvas) {
    const time = Date.now() / 1000;
    
    // الدائرة الكهربائية
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.rect(50, 50, 300, 100);
    ctx.stroke();
    
    // البطارية
    ctx.fillStyle = '#e74c3c';
    ctx.fillRect(60, 80, 15, 50);
    ctx.fillStyle = '#2ecc71';
    ctx.fillRect(80, 80, 15, 50);
    
    // السلك
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(100, 75);
    ctx.lineTo(320, 75);
    ctx.stroke();
    
    // الإلكترونات المتحركة
    for(let i = 0; i < 5; i++) {
        const x = 100 + ((time * 50 + i * 50) % 220);
        ctx.fillStyle = '#3498db';
        ctx.beginPath();
        ctx.arc(x, 75, 5, 0, Math.PI * 2);
        ctx.fill();
        
        // إضاءة حول الإلكترون
        ctx.strokeStyle = 'rgba(52, 152, 219, 0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, 75, 12, 0, Math.PI * 2);
        ctx.stroke();
    }
    
    // النص
    ctx.fillStyle = '#2c3e50';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('تدفق الإلكترونات', 120, 160);
}

// رسم الجهد الكهربائي
function drawVoltage(ctx, canvas) {
    // نقطتان
    ctx.fillStyle = '#e74c3c';
    ctx.beginPath();
    ctx.arc(80, 100, 10, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#2ecc71';
    ctx.beginPath();
    ctx.arc(320, 100, 10, 0, Math.PI * 2);
    ctx.fill();
    
    // سلك يربط بينهما
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(90, 100);
    ctx.lineTo(310, 100);
    ctx.stroke();
    
    // فولتميتر
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(200, 50, 30, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.fillStyle = '#333';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('V', 200, 55);
    
    // النصوص
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('الطاقة العالية', 80, 125);
    ctx.fillText('الطاقة المنخفضة', 320, 125);
    ctx.fillText('الجهد (V)', 200, 160);
}

// رسم المقاومة
function drawResistance(ctx, canvas) {
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    
    // سلك 1
    ctx.beginPath();
    ctx.moveTo(50, 75);
    ctx.lineTo(120, 75);
    ctx.stroke();
    
    // مقاومة (زجزاج)
    ctx.beginPath();
    ctx.moveTo(120, 75);
    for(let i = 0; i < 5; i++) {
        ctx.lineTo(140 + i*10, 55);
        ctx.lineTo(150 + i*10, 95);
    }
    ctx.lineTo(220, 75);
    ctx.stroke();
    
    // سلك 2
    ctx.beginPath();
    ctx.moveTo(220, 75);
    ctx.lineTo(350, 75);
    ctx.stroke();
    
    // الإلكترونات تصطدم
    const time = Date.now() / 1000;
    for(let i = 0; i < 3; i++) {
        const x = 130 + (time * 30 + i * 30) % 90;
        ctx.fillStyle = (x > 170) ? '#e67e22' : '#3498db';
        ctx.beginPath();
        ctx.arc(x, 75 + Math.sin(x/10)*10, 4, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // النص
    ctx.fillStyle = '#2c3e50';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('R = المقاومة', 170, 140);
}

// مقارنة السلكان
function drawWireComparison(ctx, canvas) {
    // السلك الأول (قصير)
    ctx.strokeStyle = '#3498db';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(60, 80);
    ctx.lineTo(140, 80);
    ctx.stroke();
    
    // السلك الثاني (طويل)
    ctx.strokeStyle = '#e74c3c';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(60, 140);
    ctx.lineTo(300, 140);
    ctx.stroke();
    
    // النصوص
    ctx.fillStyle = '#2c3e50';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('سلك قصير (مقاومة أقل)', 150, 85);
    ctx.fillText('سلك طويل (مقاومة أكثر)', 310, 145);
}

// قانون أوم
function drawOhmsLaw(ctx, canvas) {
    ctx.fillStyle = '#2c3e50';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('V = IR', 200, 60);
    
    ctx.font = 'bold 16px Arial';
    ctx.fillText('الجهد = التيار × المقاومة', 200, 100);
    
    // المعادلة المختلفة
    ctx.font = '14px Arial';
    ctx.fillText('I = V / R  ,  R = V / I', 200, 145);
    
    // ألوان
    ctx.fillStyle = '#e74c3c';
    ctx.fillRect(100, 165, 40, 30);
    ctx.fillStyle = 'white';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('V', 120, 185);
    
    ctx.fillStyle = '#3498db';
    ctx.fillRect(180, 165, 40, 30);
    ctx.fillStyle = 'white';
    ctx.fillText('I', 200, 185);
    
    ctx.fillStyle = '#2ecc71';
    ctx.fillRect(260, 165, 40, 30);
    ctx.fillStyle = 'white';
    ctx.fillText('R', 280, 185);
}

// الجهد والتيار
function drawCurrentVoltage(ctx, canvas) {
    ctx.fillStyle = '#e74c3c';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('عندما يزداد الجهد', 100, 50);
    
    const time = Date.now() / 1000;
    
    // أسهم التيار - اليسار
    for(let i = 0; i < 4; i++) {
        const y = 80 + i * 30;
        ctx.strokeStyle = '#3498db';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(60, y);
        ctx.lineTo(140, y);
        ctx.stroke();
        
        // رأس السهم
        ctx.beginPath();
        ctx.moveTo(140, y);
        ctx.lineTo(130, y - 5);
        ctx.lineTo(135, y);
        ctx.lineTo(130, y + 5);
        ctx.closePath();
        ctx.fill();
    }
    
    // أسهم التيار - اليمين (أكثر)
    for(let i = 0; i < 6; i++) {
        const y = 80 + i * 20;
        ctx.strokeStyle = '#2ecc71';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(260, y);
        ctx.lineTo(340, y);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(340, y);
        ctx.lineTo(330, y - 5);
        ctx.lineTo(335, y);
        ctx.lineTo(330, y + 5);
        ctx.closePath();
        ctx.fill();
    }
    
    ctx.fillStyle = '#2ecc71';
    ctx.fillText('يزداد التيار', 300, 50);
}

// المجال المغناطيسي
function drawMagneticField(ctx, canvas) {
    // المغناطيس
    ctx.fillStyle = '#e74c3c';
    ctx.fillRect(150, 50, 40, 100);
    ctx.fillStyle = 'white';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('S', 170, 105);
    
    ctx.fillStyle = '#2ecc71';
    ctx.fillRect(210, 50, 40, 100);
    ctx.fillStyle = 'white';
    ctx.fillText('N', 230, 105);
    
    // خطوط المجال
    ctx.strokeStyle = 'rgba(52, 152, 219, 0.5)';
    ctx.lineWidth = 2;
    for(let i = -3; i <= 3; i++) {
        ctx.beginPath();
        ctx.moveTo(230, 60 + i*20);
        ctx.quadraticCurveTo(280, 100, 230, 140 + i*20);
        ctx.stroke();
    }
}

// خطوط المجال المغناطيسي
function drawMagneticFieldLines(ctx, canvas) {
    // المغناطيس
    ctx.fillStyle = '#e74c3c';
    ctx.fillRect(140, 70, 60, 60);
    ctx.fillStyle = 'white';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('N', 170, 105);
    
    ctx.fillStyle = '#2ecc71';
    ctx.fillRect(200, 70, 60, 60);
    ctx.fillStyle = 'white';
    ctx.fillText('S', 230, 105);
    
    // خطوط المجال الملساء
    ctx.strokeStyle = 'rgba(52, 152, 219, 0.7)';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    
    for(let i = -4; i <= 4; i++) {
        ctx.beginPath();
        ctx.moveTo(200, 100 + i * 15);
        ctx.quadraticCurveTo(320, 100, 200, 100 + i * 15);
        ctx.stroke();
    }
    ctx.setLineDash([]);
}

// القوة على الموصل
function drawForceOnConductor(ctx, canvas) {
    // المجال المغناطيسي
    ctx.strokeStyle = 'rgba(52, 152, 219, 0.3)';
    ctx.lineWidth = 1;
    for(let i = 0; i < 10; i++) {
        ctx.beginPath();
        ctx.moveTo(100 + i*30, 50);
        ctx.lineTo(100 + i*30, 150);
        ctx.stroke();
    }
    
    ctx.fillStyle = 'rgba(52, 152, 219, 0.5)';
    ctx.font = 'bold 12px Arial';
    ctx.fillText('B (المجال المغناطيسي)', 50, 35);
    
    // السلك
    ctx.strokeStyle = '#e67e22';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(80, 100);
    ctx.lineTo(320, 100);
    ctx.stroke();
    
    ctx.fillStyle = '#2c3e50';
    ctx.textAlign = 'left';
    ctx.fillText('I (التيار)', 330, 105);
    
    // القوة
    const time = Date.now() / 1000;
    const offset = Math.sin(time * 2) * 15;
    ctx.strokeStyle = '#2ecc71';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(200, 100);
    ctx.lineTo(200, 60 + offset);
    ctx.stroke();
    
    // رأس السهم
    ctx.beginPath();
    ctx.moveTo(200, 60 + offset);
    ctx.lineTo(195, 70 + offset);
    ctx.lineTo(205, 70 + offset);
    ctx.closePath();
    ctx.fill();
    
    ctx.fillText('F (القوة)', 210, 65 + offset);
}

// الموصل الموازي
function drawParallelConductor(ctx, canvas) {
    // السلك الأول
    ctx.strokeStyle = '#e74c3c';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(100, 70);
    ctx.lineTo(300, 70);
    ctx.stroke();
    
    // السلك الثاني
    ctx.strokeStyle = '#3498db';
    ctx.beginPath();
    ctx.moveTo(100, 130);
    ctx.lineTo(300, 130);
    ctx.stroke();
    
    // التيار - السلك الأول
    ctx.fillStyle = '#e74c3c';
    ctx.font = 'bold 12px Arial';
    ctx.fillText('I ← ', 310, 75);
    
    // التيار - السلك الثاني
    ctx.fillStyle = '#3498db';
    ctx.fillText('I ← ', 310, 135);
    
    // المجال
    ctx.fillStyle = 'rgba(52, 152, 219, 0.3)';
    ctx.fillRect(80, 40, 250, 120);
    
    // النص
    ctx.fillStyle = '#2c3e50';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('عندما يكون الموصل موازياً للمجال', 200, 180);
    ctx.fillText('F = 0', 200, 200);
}

// تحديث الرسوم بشكل متكرر
setInterval(() => {
    const canvas = document.getElementById('physicsCanvas');
    if(canvas) {
        const questionIndex = currentQuestionIndex % questions.length;
        drawPhysicsIllustration(questionIndex);
    }
}, 50);