import asyncio
from playwright.async_api import async_playwright, expect

async def run_test():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        context = await browser.new_context()
        page = await context.new_page()

        # Dialog 자동 닫기 처리
        page.on("dialog", lambda dialog: asyncio.create_task(dialog_handler(dialog)))

        async def dialog_handler(dialog):
            print(f"⚠️ [Alert] {dialog.message}")
            await dialog.accept()

        try:
            print("1. 메인 페이지 이동")
            await page.goto("http://localhost:3000")
            
            print("2. 로그인 페이지로 이동")
            # 헤더의 로그인 버튼 클릭
            login_link = page.get_by_role("link", name="로그인")
            if await login_link.count() > 0:
                 await login_link.first.click()
            else:
                print("   ℹ️ 메인화면에 로그인 버튼이 없습니다 (이미 로그인 상태일 수 있음)")
            
            await page.wait_for_url("**/auth/login")

            print("3. 개발용 테스트 계정으로 로그인 시도")
            dev_login_btn = page.get_by_role("button", name="테스트 계정으로 로그인 (Dev Only)")
            
            await expect(dev_login_btn).to_be_visible(timeout=5000)
            await dev_login_btn.click()

            print("4. 로그인 결과 대기...")
            
            try:
                # 로그인 성공 시 루트('/')로 이동
                await page.wait_for_url("http://localhost:3000/", timeout=10000)
                print("✅ 로그인 성공! (URL 리다이렉트 확인됨)")

                # 로그인 상태 검증 (로그인 버튼이 없어야 함)
                await expect(page.get_by_role("link", name="로그인")).not_to_be_visible()
                print("✅ UI 상태 검증 완료")
                
            except Exception as e:
                # 타임아웃 등 에러 발생 시 UI 에러 메시지 확인
                print(f"⚠️ 리다이렉트 실패 또는 지연: {e}")
                
                error_msg = page.locator(".text-red-500")
                if await error_msg.count() > 0:
                    text = await error_msg.text_content()
                    print(f"❌ [로그인 실패] 화면 에러 메시지: {text}")
                else:
                    print("❌ 화면에 에러 메시지도 나타나지 않았습니다. 콘솔이나 네트워크 탭을 확인해야 합니다.")
                
                # 디버깅용 스크린샷
                await page.screenshot(path="login_failure_debug.png", full_page=True)
                print("📸 디버깅용 스크린샷 저장: login_failure_debug.png")
                raise e

            print("5. 커뮤니티 글쓰기 권한 테스트")
            await page.goto("http://localhost:3000/community/write")
            
            # 글쓰기 페이지 타이틀이나 핵심 요소 확인
            # (예: '글쓰기' 헤더 혹은 입력 폼)
            await expect(page.locator("text=글쓰기")).to_be_visible()
            print("✅ 글쓰기 페이지 접근 확인 완료")
            print("🎉 모든 테스트를 통과했습니다!")

        except Exception as e:
            print(f"❌ 최종 테스트 실패")
        
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(run_test())
