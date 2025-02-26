<p align="center"><h1 align="center">Green Notes</h1></p>

## Table of Contents

- [ Overview](#-overview)
- [ Features](#-features)
- [ Project Structure](#-project-structure)

   - [ Project Index](#-project-index)

- [ Getting Started](#-getting-started)

   - [ Prerequisites](#-prerequisites)
   - [ Installation](#-installation)
   - [ Usage](#-usage)
   - [ Testing](#-testing)

- [ Project Roadmap](#-project-roadmap)
- [ Contributing](#-contributing)
- [ License](#-license)
- [ Acknowledgments](#-acknowledgments)

---

## Overview

This is a project where I made a full-stack note-taking application. Currently, the project is not online as there are some security issues I would need to extensively take care of. Primarily, detering HTML injection, and XSS attacks, which I am unfamilar with at the moment. (I will to try to find a library to help with this in the future).

---

## Features

A full stack application will secure sign up and login page, session cookies, the ability to delete, update or change emails or passwords securely, and a bunch more. The site has multiple pages (8~ + any pages you create for note taking). In the backend, it supports around 20~ routes that allow users to permanently store or delete their notes

---

## Project Structure

```sh
└── Note-taking_app_green_notes_fullstack.git/
    ├── README.md
    ├── green_notes_2
    │   ├── .eslintrc.cjs
    │   ├── .gitignore
    │   ├── README.md
    │   ├── index.html
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── postcss.config.js
    │   ├── public
    │   ├── src
    │   ├── tailwind.config.js
    │   ├── tsconfig.json
    │   ├── tsconfig.node.json
    │   └── vite.config.ts
    └── green_notes_backend
        ├── .gitignore
        ├── Makefile
        ├── README.md
        ├── go.mod
        ├── go.sum
        ├── main.go
        ├── qodana.yaml
        ├── requests
        ├── security
        └── types
```

### Project Index

<details open>
	<summary><b><code>NOTE-TAKING_APP_GREEN_NOTES_FULLSTACK.GIT/</code></b></summary>
	<details> <!-- __root__ Submodule -->
		<summary><b>__root__</b></summary>
		<blockquote>
			<table>
			</table>
		</blockquote>
	</details>
	<details> <!-- green_notes_backend Submodule -->
		<summary><b>green_notes_backend</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_backend/go.mod'>go.mod</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_backend/Makefile'>Makefile</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_backend/go.sum'>go.sum</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_backend/qodana.yaml'>qodana.yaml</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_backend/main.go'>main.go</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			</table>
			<details>
				<summary><b>types</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_backend/types/type.go'>type.go</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					</table>
				</blockquote>
			</details>
			<details>
				<summary><b>security</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_backend/security/cookies.go'>cookies.go</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					</table>
				</blockquote>
			</details>
			<details>
				<summary><b>requests</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_backend/requests/database.go'>database.go</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_backend/requests/DatabasePool.go'>DatabasePool.go</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_backend/requests/requests.go'>requests.go</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					</table>
				</blockquote>
			</details>
		</blockquote>
	</details>
	<details> <!-- green_notes_2 Submodule -->
		<summary><b>green_notes_2</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/tsconfig.node.json'>tsconfig.node.json</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/index.html'>index.html</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/tailwind.config.js'>tailwind.config.js</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/.eslintrc.cjs'>.eslintrc.cjs</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/package-lock.json'>package-lock.json</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/package.json'>package.json</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/tsconfig.json'>tsconfig.json</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/vite.config.ts'>vite.config.ts</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/postcss.config.js'>postcss.config.js</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			</table>
			<details>
				<summary><b>src</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/src/App.tsx'>App.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/src/main.tsx'>main.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/src/vite-env.d.ts'>vite-env.d.ts</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					</table>
					<details>
						<summary><b>layout</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/src/layout/RootLayout.tsx'>RootLayout.tsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>style</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/src/style/App.css'>App.css</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/src/style/index.css'>index.css</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>general</b></summary>
						<blockquote>
							<details>
								<summary><b>types</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/src/general/types/UserInfo.enum.ts'>UserInfo.enum.ts</a></b></td>
										<td><code>❯ REPLACE-ME</code></td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/src/general/types/UserInfo.interface.ts'>UserInfo.interface.ts</a></b></td>
										<td><code>❯ REPLACE-ME</code></td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/src/general/types/UserLogin.interface.ts'>UserLogin.interface.ts</a></b></td>
										<td><code>❯ REPLACE-ME</code></td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/src/general/types/UserLogin.enum.ts'>UserLogin.enum.ts</a></b></td>
										<td><code>❯ REPLACE-ME</code></td>
									</tr>
									</table>
								</blockquote>
							</details>
							<details>
								<summary><b>lotties</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/src/general/lotties/loading.json'>loading.json</a></b></td>
										<td><code>❯ REPLACE-ME</code></td>
									</tr>
									</table>
								</blockquote>
							</details>
							<details>
								<summary><b>general_components</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/src/general/general_components/Navbar.tsx'>Navbar.tsx</a></b></td>
										<td><code>❯ REPLACE-ME</code></td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/src/general/general_components/ErrorPage.tsx'>ErrorPage.tsx</a></b></td>
										<td><code>❯ REPLACE-ME</code></td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/src/general/general_components/Loading.tsx'>Loading.tsx</a></b></td>
										<td><code>❯ REPLACE-ME</code></td>
									</tr>
									</table>
								</blockquote>
							</details>
							<details>
								<summary><b>hooks</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/src/general/hooks/auth.hook.tsx'>auth.hook.tsx</a></b></td>
										<td><code>❯ REPLACE-ME</code></td>
									</tr>
									</table>
								</blockquote>
							</details>
							<details>
								<summary><b>api</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/src/general/api/getCookie.ts'>getCookie.ts</a></b></td>
										<td><code>❯ REPLACE-ME</code></td>
									</tr>
									</table>
								</blockquote>
							</details>
							<details>
								<summary><b>helper</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/src/general/helper/string.ts'>string.ts</a></b></td>
										<td><code>❯ REPLACE-ME</code></td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/src/general/helper/cookies.ts'>cookies.ts</a></b></td>
										<td><code>❯ REPLACE-ME</code></td>
									</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
					<details>
						<summary><b>pages</b></summary>
						<blockquote>
							<details>
								<summary><b>home</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/src/pages/home/Home.tsx'>Home.tsx</a></b></td>
										<td><code>❯ REPLACE-ME</code></td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/src/pages/home/homepage.css'>homepage.css</a></b></td>
										<td><code>❯ REPLACE-ME</code></td>
									</tr>
									</table>
								</blockquote>
							</details>
							<details>
								<summary><b>sign-up</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/src/pages/sign-up/SignUp.tsx'>SignUp.tsx</a></b></td>
										<td><code>❯ REPLACE-ME</code></td>
									</tr>
									</table>
									<details>
										<summary><b>components</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/src/pages/sign-up/components/SignUpForm.tsx'>SignUpForm.tsx</a></b></td>
												<td><code>❯ REPLACE-ME</code></td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/src/pages/sign-up/components/SignUpFields.tsx'>SignUpFields.tsx</a></b></td>
												<td><code>❯ REPLACE-ME</code></td>
											</tr>
											</table>
										</blockquote>
									</details>
								</blockquote>
							</details>
							<details>
								<summary><b>old_notes</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/src/pages/old_notes/notes.css'>notes.css</a></b></td>
										<td><code>❯ REPLACE-ME</code></td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/src/pages/old_notes/NoteApp.tsx'>NoteApp.tsx</a></b></td>
										<td><code>❯ REPLACE-ME</code></td>
									</tr>
									</table>
									<details>
										<summary><b>components</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/src/pages/old_notes/components/Note.tsx'>Note.tsx</a></b></td>
												<td><code>❯ REPLACE-ME</code></td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/src/pages/old_notes/components/NotesList.tsx'>NotesList.tsx</a></b></td>
												<td><code>❯ REPLACE-ME</code></td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/src/pages/old_notes/components/search.tsx'>search.tsx</a></b></td>
												<td><code>❯ REPLACE-ME</code></td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/src/pages/old_notes/components/AddNote.tsx'>AddNote.tsx</a></b></td>
												<td><code>❯ REPLACE-ME</code></td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/src/pages/old_notes/components/Header.tsx'>Header.tsx</a></b></td>
												<td><code>❯ REPLACE-ME</code></td>
											</tr>
											</table>
										</blockquote>
									</details>
								</blockquote>
							</details>
							<details>
								<summary><b>about</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/src/pages/about/aboutpage.css'>aboutpage.css</a></b></td>
										<td><code>❯ REPLACE-ME</code></td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/src/pages/about/About.tsx'>About.tsx</a></b></td>
										<td><code>❯ REPLACE-ME</code></td>
									</tr>
									</table>
									<details>
										<summary><b>components</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/src/pages/about/components/AboutMore.tsx'>AboutMore.tsx</a></b></td>
												<td><code>❯ REPLACE-ME</code></td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/src/pages/about/components/AboutExplain.tsx'>AboutExplain.tsx</a></b></td>
												<td><code>❯ REPLACE-ME</code></td>
											</tr>
											</table>
										</blockquote>
									</details>
								</blockquote>
							</details>
							<details>
								<summary><b>dashboard</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/src/pages/dashboard/UserMainPage.tsx'>UserMainPage.tsx</a></b></td>
										<td><code>❯ REPLACE-ME</code></td>
									</tr>
									</table>
									<details>
										<summary><b>inner-pages</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/src/pages/dashboard/inner-pages/Settings.tsx'>Settings.tsx</a></b></td>
												<td><code>❯ REPLACE-ME</code></td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/src/pages/dashboard/inner-pages/Dashboard.tsx'>Dashboard.tsx</a></b></td>
												<td><code>❯ REPLACE-ME</code></td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/src/pages/dashboard/inner-pages/Notes.tsx'>Notes.tsx</a></b></td>
												<td><code>❯ REPLACE-ME</code></td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/src/pages/dashboard/inner-pages/Profile.tsx'>Profile.tsx</a></b></td>
												<td><code>❯ REPLACE-ME</code></td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/src/pages/dashboard/inner-pages/ANote.tsx'>ANote.tsx</a></b></td>
												<td><code>❯ REPLACE-ME</code></td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>components</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/src/pages/dashboard/components/DashboardNavbar.tsx'>DashboardNavbar.tsx</a></b></td>
												<td><code>❯ REPLACE-ME</code></td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/src/pages/dashboard/components/Stats.tsx'>Stats.tsx</a></b></td>
												<td><code>❯ REPLACE-ME</code></td>
											</tr>
											</table>
										</blockquote>
									</details>
								</blockquote>
							</details>
							<details>
								<summary><b>new-password</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/src/pages/new-password/NewPassword.tsx'>NewPassword.tsx</a></b></td>
										<td><code>❯ REPLACE-ME</code></td>
									</tr>
									</table>
								</blockquote>
							</details>
							<details>
								<summary><b>forget-password</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/src/pages/forget-password/ForgotPassword.tsx'>ForgotPassword.tsx</a></b></td>
										<td><code>❯ REPLACE-ME</code></td>
									</tr>
									</table>
								</blockquote>
							</details>
							<details>
								<summary><b>login</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/master/green_notes_2/src/pages/login/Login.tsx'>Login.tsx</a></b></td>
										<td><code>❯ REPLACE-ME</code></td>
									</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
				</blockquote>
			</details>
		</blockquote>
	</details>
</details>

---

## Getting Started

### Prerequisites

__Each npm and go command must be run in their respective repo (npm -> gren_notes_2) and (go -> green_notes_backend)__

Before getting started with Note-taking_app_green_notes_fullstack.git, ensure your runtime environment meets the following requirements:

- **Programming Language:** TypeScript
- **Package Manager:** Go modules, Npm

### Installation

Install Note-taking_app_green_notes_fullstack.git using one of the following methods:

**Build from source:**

1. Clone the Note-taking_app_green_notes_fullstack.git repository:

```sh
❯ git clone https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git
```

2. Navigate to the project directory:

```sh
❯ cd Note-taking_app_green_notes_fullstack.git
```

3. Install the project dependencies:

**Using `go modules`** &nbsp; [<img align="center" src="" />]()

go to the [installation page](https://go.dev/doc/install) for go

```sh
go get -u -v -f all
```

__Using `npm`__ &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm install
```

### Usage

Run Note-taking_app_green_notes_fullstack.git using the following command:
__Using `go modules`__ &nbsp; [<img align="center" src="" />]()

```sh
❯ go run .
```

__Using `npm`__ &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm start
```

### Testing (Not yet Implemented)

Run the test suite using the following command:
**Using `go modules`** &nbsp; [<img align="center" src="" />]()

```sh
❯ go test
```

__Using `npm`__ &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm test
```

---

## Project Roadmap

- [X] **`Task 1`**: <strike>Implement SQL Injection Prevention</strike>
- [ ] **`Task 2`**: Making a better UI for the note taking portion.
- [ ] **`Task 3`**: Allow the storing of different HTML tags on the backend for saved styling.

---

## Contributing

- __🐛 [Report Issues](https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/issues)__: Submit bugs found or log feature requests for the `Note-taking_app_green_notes_fullstack.git` project.
- __💡 [Submit Pull Requests](https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git/blob/main/CONTRIBUTING.md)__: Review open PRs, and submit your own PRs.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.

```sh
git clone https://github.com/DanielCoder834/Note-taking_app_green_notes_fullstack.git
```

3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.

```sh
git checkout -b new-feature-x
```

4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.

```sh
git commit -m 'Implemented new feature x.'
```

6. **Push to github**: Push the changes to your forked repository.

```sh
git push origin new-feature-x
```

7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!

---

## License

This project is protected under the [MIT License](https://choosealicense.com/licenses/mit/) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/mit/) file.

---

## Acknowledgments

- List for any resources, contributors, inspiration, etc. here.

---

- I used Go's pgx library, which had an awesome community for getting help for their Postgres Driver :)
