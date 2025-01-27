//nav
$(document).ready(function() {
  // 마우스가 nav에 들어갈 때
  $('nav').mouseenter(function() {
    var $submenus = $(this).find('.submenu');
    
    $submenus.each(function() {
      var $submenu = $(this);
      var parentOffset = $submenu.parent().offset();
      
      // 서브메뉴의 위치를 조정
      $submenu.css({
        'left': '0', // 서브메뉴가 부모 요소와 맞춰서 왼쪽 정렬
        'width': $submenu.parent().outerWidth() + 'px' // 부모 요소의 너비에 맞게 설정
      });
    });
    
    $submenus.show(); // 모든 서브메뉴 표시
    $('.menuBg').show(); // menuBg 표시
  });

  // nav와 menuBg 둘 다에서 마우스가 떠날 때 서브메뉴와 배경을 숨김
  $('nav, .menuBg').mouseleave(function() {
    // 서브메뉴와 menuBg를 모두 숨김
    $('.submenu').hide(); 
    $('.menuBg').hide();
  });

  // menuBg에 마우스가 올라갈 때 서브메뉴와 menuBg 유지
  $('.menuBg').mouseenter(function() {
    $('.submenu').show(); // 서브메뉴 유지
    $(this).show(); // menuBg 유지
  });

  // 서브메뉴에 마우스가 올라가면 유지
  $('.submenu').mouseenter(function() {
    $(this).show(); // 서브메뉴 유지
    $('.menuBg').show(); // menuBg 유지
  });
});




// mobile category


$(document).ready(function() {
  // 카테고리 아이콘 클릭 시 메뉴와 배경색을 표시
  $('.mobile-category').click(function() {
    $('.mobile-category-hidden').css({ left: '-320px', display: 'block' }).animate({ left: '0px' }, 300);
    $('.body-overlay').fadeIn(); // 배경색 표시
    $('body').css('overflow', 'hidden'); // 페이지 스크롤 방지
  });

  // 문서 클릭 시 모바일 카테고리 메뉴와 배경색을 닫기
  $(document).click(function(e) {
    var $menu = $('.mobile-category-hidden');
    var $icon = $('.mobile-category');

    // 클릭한 요소가 메뉴나 메뉴 아이콘이 아니면
    if (!$menu.is(e.target) && $menu.has(e.target).length === 0 && !$icon.is(e.target) && $icon.has(e.target).length === 0) {
      $menu.animate({ left: '-320px' }, 300, function() {
        $(this).css('display', 'none');
      });
      $('.body-overlay').fadeOut(); // 배경색 원래대로 돌리기
      $('body').css('overflow', 'auto'); // 페이지 스크롤 복구
    }
  });

  // 메뉴 클릭 시 해당 2차 메뉴를 토글
  $('.mh-main-1 > li').click(function(e) {
    e.preventDefault(); // 기본 앵커 동작 방지

    var $submenu = $(this).find('.h-sub');

    // 클릭된 1차 메뉴 외의 다른 2차 메뉴는 모두 닫음
    $('.h-sub').not($submenu).slideUp();

    // 클릭된 1차 메뉴 내에서만 2차 메뉴를 토글
    $submenu.slideToggle();
  });

  // Prevent submenu clicks from closing the main menu
  $('.h-sub a').click(function(e) {
    e.stopPropagation(); // Prevent click event from bubbling
  });

  // 윈도우 리사이즈 이벤트 처리
  $(window).resize(function() {
    var $menu = $('.mobile-category-hidden');
    if ($menu.is(':visible') && $(window).width() > 768) { // 특정 너비 초과 시
      $menu.animate({ left: '-320px' }, 300, function() {
        $(this).css('display', 'none');
      });
      $('.body-overlay').fadeOut(); // 배경색 원래대로 돌리기
      $('body').css('overflow', 'auto'); // 페이지 스크롤 복구
    }
  });
});
//메인메뉴
$(document).ready(function() {
  // 초기 상태로 "메인메뉴" 섹션만 보이도록 설정하고, '메인메뉴' 항목에 색상 적용
  $('.menu-box.main-images').addClass('active');
  $('.menu-list-tbox ul li[data-target="main-images"]').addClass('active');
  
  // 메뉴 항목 클릭 시 동작
  $('.menu-list-tbox ul li').on('click', function(event) {
    event.preventDefault();
    
    // 클릭한 항목의 데이터 속성에서 대상 섹션을 가져옴
    var targetClass = $(this).data('target');
    
    // 클릭한 항목의 제목을 가져와서 제목 텍스트 변경
    var titleText = $(this).data('title');
    $('.title').text(titleText);
    
    // 모든 메뉴 박스에서 'active' 클래스를 제거해 섹션 숨김
    $('.menu-box').removeClass('active');
    
    // 선택된 메뉴 박스에 'active' 클래스를 추가해 표시
    $('.menu-box.' + targetClass).addClass('active');
    
    // 모든 li 항목에서 'active' 클래스를 제거해 색상 초기화
    $('.menu-list-tbox ul li').removeClass('active');
    
    // 클릭된 li 항목에 'active' 클래스 추가해 색상 변경
    $(this).addClass('active');
    
    // 클릭된 li의 span 태그 색상 변경
    $(this).find('span').css({
      'color': 'black',
      'font-weight': '700'
    });
  });

  // 특정 조건이 맞을 때만 애니메이션 적용
  $('.menu-list-tbox > ul > li > a').on('click', function() {
    $('.menu-box').addClass('animate');
  });
});


//팝업
$(document).ready(function() {
  function shouldShowPopup() {
    return !document.cookie.split('; ').find(row => row.startsWith('hidePopup='));
  }

  function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  if (shouldShowPopup()) {
    $(".popup").show();
    $(".popup-overlay").show(); // 팝업이 열릴 때 배경색 보이기
  } else {
    $(".popup").hide();
    $(".popup-overlay").hide(); // 팝업이 숨겨질 때 배경색 숨기기
  }

  $(".b-left").click(function() {
    setCookie("hidePopup", "true", 1);
    $(".popup").hide();
    $(".popup-overlay").hide(); // 팝업 숨기고 배경색 숨기기
  });

  $(".b-right").click(function() {
    $(".popup").hide();
    $(".popup-overlay").hide(); // 팝업 숨기고 배경색 숨기기
  });
});

