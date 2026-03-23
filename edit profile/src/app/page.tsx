import Link from 'next/link';

export default function Home() {
  return (
    <div className="app-container page-account">
      <div className="header-index">
        <div className="top-bar">
          <div className="page-title">บัญชีผู้ใช้</div>
          <Link href="#" className="settings-btn">
            <span className="material-symbols-outlined">settings</span> ตั้งค่า
          </Link>
        </div>
        
        <div className="profile-section">
          <div className="avatar-wrapper">
            <img src="/avatar.png" alt="Profile" className="avatar" />
            <div className="avatar-badge" style={{ backgroundColor: '#c93b9e' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>photo_camera</span>
            </div>
          </div>
          <div className="profile-info">
            <div className="profile-name">ศิญาพร  ชำนิราศิริกูล</div>
            <div className="profile-phone">เบอร์มือถือ: 09*-***-1234</div>
            <div className="verified-badge">
              <span className="material-symbols-outlined">check_circle</span>
              ยืนยันตัวตนแล้ว
            </div>
          </div>
          <Link href="/personal_info" className="edit-btn">
            <span className="material-symbols-outlined" style={{color: '#666', fontSize: '24px'}}>edit</span>
          </Link>
        </div>
      </div>

      <div className="section-title">จัดการบัญชี</div>
      <div className="menu-list">
        <Link href="#" className="menu-item">
          <div className="menu-icon"><span className="material-symbols-outlined">bolt</span></div>
          <div className="menu-content"><div className="menu-label">จัดการสถานที่ใช้ไฟฟ้า</div></div>
          <div className="menu-arrow"><span className="material-symbols-outlined">chevron_right</span></div>
        </Link>
        <Link href="#" className="menu-item">
          <div className="menu-icon"><span className="material-symbols-outlined">list_alt</span></div>
          <div className="menu-content">
            <div className="menu-label">ติดตามสถานะ</div>
            <div className="menu-sublabel">ติดตามสถานะคำขอรับบริการและคำร้องได้ที่นี่</div>
          </div>
          <div className="menu-arrow"><span className="material-symbols-outlined">chevron_right</span></div>
        </Link>
        <Link href="#" className="menu-item">
          <div className="menu-icon"><span className="material-symbols-outlined">receipt_long</span></div>
          <div className="menu-content"><div className="menu-label">จัดการบิลและใบเสร็จ</div></div>
          <div className="menu-arrow"><span className="material-symbols-outlined">chevron_right</span></div>
        </Link>

        <Link href="#" className="menu-item">
          <div className="menu-icon"><span className="material-symbols-outlined">card_giftcard</span></div>
          <div className="menu-content"><div className="menu-label">สมาชิก Watt-D Point</div></div>
          <div className="menu-arrow"><span className="material-symbols-outlined">chevron_right</span></div>
        </Link>
      </div>

      <div className="section-title">ความช่วยเหลือ</div>
      <div className="menu-list">
        <Link href="#" className="menu-item">
          <div className="menu-icon"><span className="material-symbols-outlined">store</span></div>
          <div className="menu-content"><div className="menu-label">สาขาและช่องทางให้บริการ</div></div>
          <div className="menu-arrow"><span className="material-symbols-outlined">chevron_right</span></div>
        </Link>
        <Link href="#" className="menu-item">
          <div className="menu-icon"><span className="material-symbols-outlined">help_outline</span></div>
          <div className="menu-content"><div className="menu-label">คำถามที่พบบ่อย/แนะนำการใช้งาน</div></div>
          <div className="menu-arrow"><span className="material-symbols-outlined">chevron_right</span></div>
        </Link>
        <Link href="#" className="menu-item">
          <div className="menu-icon"><span className="material-symbols-outlined">electrical_services</span></div>
          <div className="menu-content"><div className="menu-label">แจ้งเหตุไฟฟ้าขัดข้อง</div></div>
          <div className="menu-arrow"><span className="material-symbols-outlined">chevron_right</span></div>
        </Link>
        <Link href="#" className="menu-item">
          <div className="menu-icon"><span className="material-symbols-outlined">sms_failed</span></div>
          <div className="menu-content"><div className="menu-label">แจ้งปัญหา</div></div>
          <div className="menu-arrow"><span className="material-symbols-outlined">chevron_right</span></div>
        </Link>
        <Link href="#" className="menu-item">
          <div className="menu-icon"><span className="material-symbols-outlined">contact_support</span></div>
          <div className="menu-content"><div className="menu-label">สอบถาม/แนะนำติชม</div></div>
          <div className="menu-arrow"><span className="material-symbols-outlined">chevron_right</span></div>
        </Link>
        <Link href="#" className="menu-item">
          <div className="menu-icon"><span className="material-symbols-outlined">forum</span></div>
          <div className="menu-content"><div className="menu-label">ติดต่อเรา</div></div>
          <div className="menu-arrow"><span className="material-symbols-outlined">chevron_right</span></div>
        </Link>
      </div>

      <div className="section-title">ข้อกำหนดและเงื่อนไข</div>
      <div className="menu-list">
        <Link href="#" className="menu-item">
          <div className="menu-icon"><span className="material-symbols-outlined">gpp_good</span></div>
          <div className="menu-content"><div className="menu-label">นโยบายคุ้มครองข้อมูลส่วนบุคคล</div></div>
          <div className="menu-arrow"><span className="material-symbols-outlined">chevron_right</span></div>
        </Link>
        <Link href="#" className="menu-item">
          <div className="menu-icon"><span className="material-symbols-outlined">policy</span></div>
          <div className="menu-content"><div className="menu-label">ข้อกำหนดและเงื่อนไข</div></div>
          <div className="menu-arrow"><span className="material-symbols-outlined">chevron_right</span></div>
        </Link>
      </div>

      <br/>
      <div className="menu-list">
        <Link href="#" className="menu-item">
          <div className="menu-icon"><span className="material-symbols-outlined">logout</span></div>
          <div className="menu-content"><div className="menu-label">ออกจากระบบ</div></div>
          <div className="menu-arrow"><span className="material-symbols-outlined">chevron_right</span></div>
        </Link>
      </div>

      <div className="footer-text">
        เวอร์ชัน 0.0.0<br/>
        © 2568 การไฟฟ้าส่วนภูมิภาค
      </div>

      <div className="bottom-nav">
        <Link href="#" className="nav-item">
          <img src="/images/nav-bar.svg" alt="Home" width="24" height="24" />
          หน้าหลัก
        </Link>
        <Link href="#" className="nav-item">
          <img src="/images/nav-bar2.svg" alt="Property" width="24" height="24" />
          สถานที่ใช้ไฟ
        </Link>
        <Link href="#" className="nav-item">
          <img src="/images/nav-bar3.svg" alt="Services" width="24" height="24" />
          บริการ
        </Link>
        <Link href="#" className="nav-item">
          <img src="/images/nav-bar4.svg" alt="Points" width="24" height="24" />
          พอยต์
        </Link>
        <Link href="#" className="nav-item active">
          <img src="/images/user-avatar-1.svg" alt="Profile" width="24" height="24" />
          โปรไฟล์
        </Link>
      </div>
    </div>
  );
}
