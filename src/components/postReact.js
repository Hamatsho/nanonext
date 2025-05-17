import { useState } from 'react';
import axios from 'axios';

function LoginForm  () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // بدء تحميل
    setLoading(true);

    try {
      const response = await axios.post('https://api.example.com/login', {
        email,
        password
      });

      // معالجة الاستجابة الناجحة
      console.log('تم تسجيل الدخول بنجاح:', response.data);
      // هنا يمكنك التوجيه إلى الصفحة الرئيسية أو حفظ بيانات المستخدم في الحالة

    } catch (err) {
      // معالجة الأخطاء
      setError('حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.');
      console.error('حدث خطأ:', err);
    }

    // إيقاف تحميل
    setLoading(false);
  };

  return (
    <div>
      <h2>تسجيل الدخول</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>البريد الإلكتروني:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>كلمة المرور:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <div>
          <button type="submit" disabled={loading}>
            {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
