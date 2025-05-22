<template>

  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
    <!-- Navbar -->
    <nav class="sticky top-0 z-50 backdrop-blur-lg bg-gray-900/80 border-b border-gray-800/60 shadow-lg">
      <div class="container mx-auto px-4 py-3">
        <div class="flex justify-between items-center">
          <!-- Logo -->
          <div class="flex items-center space-x-2">
            <div
                class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <span class="text-white font-bold text-xl">S</span>
            </div>
            <div>
              <h1 class="font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Sami's E-Learning
              </h1>
              <p class="text-xs text-gray-400">Unlock Your Potential</p>
            </div>
          </div>

          <!-- Navigation -->
          <div class="hidden md:flex items-center space-x-8">
            <a href="#" class="text-white hover:text-blue-400 transition-colors">Home</a>
            <a href="#courses" class="text-gray-400 hover:text-blue-400 transition-colors">Courses</a>
            <a href="#about" class="text-gray-400 hover:text-blue-400 transition-colors">About Us</a>
            <a href="#testimonials" class="text-gray-400 hover:text-blue-400 transition-colors">Testimonials</a>
            <a href="#contact" class="text-gray-400 hover:text-blue-400 transition-colors">Contact</a>
          </div>

          <!-- Auth Buttons -->
          <div class="flex items-center space-x-4">
            <router-link to="/login"
                         class="hidden md:block px-4 py-2 rounded-lg border border-gray-700 hover:border-blue-500 hover:bg-blue-900/20 transition-all">
              Log In
            </router-link>
            <button
                class="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg">
              Get Started
            </button>

            <!-- Mobile Menu Button -->
            <button class="md:hidden p-2 rounded-lg bg-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32">
      <!-- Background Glow Effects -->
      <div class="absolute top-20 right-0 w-96 h-96 bg-blue-600/20 rounded-full filter blur-3xl"></div>
      <div class="absolute bottom-10 left-10 w-96 h-96 bg-purple-600/20 rounded-full filter blur-3xl"></div>

      <div class="container mx-auto px-4 relative z-10">
        <div class="flex flex-col md:flex-row items-center">
          <!-- Left Column: Hero Text -->
          <div class="md:w-1/2 mb-10 md:mb-0">
            <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span class="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Future-Proof Your Career
            </span>
              <br/>with Expert-Led Learning
            </h1>

            <p class="text-gray-300 text-lg mb-8 max-w-lg">
              Unlock your potential with cutting-edge courses designed for the skills of tomorrow. Learn at your own
              pace
              with our immersive learning platform.
            </p>

            <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                  class="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg text-lg font-medium">
                Browse Courses
              </button>
              <button
                  class="px-6 py-3 rounded-lg border border-gray-700 hover:border-blue-500 hover:bg-blue-900/20 transition-all text-lg font-medium flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Watch Demo
              </button>
            </div>

            <!-- Stats -->
            <div class="mt-12 grid grid-cols-3 gap-4">
              <div class="text-center">
                <div class="text-3xl font-bold text-blue-400">100+</div>
                <div class="text-gray-400 text-sm">Courses</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-purple-400">50K+</div>
                <div class="text-gray-400 text-sm">Students</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-blue-400">98%</div>
                <div class="text-gray-400 text-sm">Satisfaction</div>
              </div>
            </div>
          </div>

          <!-- Right Column: Hero Image -->
          <div class="md:w-1/2 flex justify-center md:justify-end">
            <div class="relative">
              <!-- Frame decoration -->
              <div
                  class="absolute inset-0 border-2 border-blue-500/30 rounded-lg transform translate-x-4 translate-y-4"></div>

              <!-- Main image -->
              <div
                  class="relative z-10 rounded-lg overflow-hidden border border-gray-700/50 shadow-xl bg-gray-800/50 backdrop-blur-sm w-full max-w-lg">
                <img src="/students.jpg" alt="Students learning with digital interface"
                     class="w-full h-auto"/>

                <!-- Floating elements -->
                <div
                    class="absolute top-4 left-4 bg-gray-900/80 backdrop-blur-sm p-3 rounded-lg border border-gray-700/50 shadow-lg">
                  <div class="flex items-center space-x-2">
                    <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span class="text-sm font-medium">Live Classes</span>
                  </div>
                </div>

                <div
                    class="absolute bottom-4 right-4 bg-gray-900/80 backdrop-blur-sm p-3 rounded-lg border border-gray-700/50 shadow-lg">
                  <div class="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-400" fill="none"
                         viewBox="0 0 24 24"
                         stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span class="text-sm font-medium">Learn at Your Pace</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-gray-800/30">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <h2 class="text-3xl font-bold mb-4">Why Choose <span
              class="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Sami's E-Learning</span>
          </h2>
          <p class="text-gray-300">Our platform is designed to provide the best learning experience possible with
            cutting-edge features.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div
              class="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-lg hover:shadow-blue-500/10 transition-shadow">
            <div class="w-14 h-14 mb-6 bg-blue-600/20 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3">Expert-Crafted Curriculum</h3>
            <p class="text-gray-400">Our courses are designed by industry professionals with years of experience to
              ensure
              you're learning what matters.</p>
          </div>

          <!-- Feature 2 -->
          <div
              class="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-lg hover:shadow-purple-500/10 transition-shadow">
            <div class="w-14 h-14 mb-6 bg-purple-600/20 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3">Interactive Learning</h3>
            <p class="text-gray-400">Engage with course materials through quizzes, projects, and hands-on exercises
              designed
              to reinforce your knowledge.</p>
          </div>

          <!-- Feature 3 -->
          <div
              class="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-lg hover:shadow-blue-500/10 transition-shadow">
            <div class="w-14 h-14 mb-6 bg-blue-600/20 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3">Community Support</h3>
            <p class="text-gray-400">Join a thriving community of learners and instructors for discussions,
              networking, and
              collaborative projects.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Popular Courses Section -->
    <section id="courses" class="py-16">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-end mb-10">
          <div>
            <h2 class="text-3xl font-bold">Popular Courses</h2>
            <p class="text-gray-400 mt-2">Start your learning journey with our top-rated courses</p>
          </div>
          <a href="#" class="text-blue-400 hover:text-blue-300 transition-colors flex items-center">
            View All
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Course 1 -->
          <div
              class="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-blue-500/10 hover:border-blue-500/30 group">
            <div class="relative">
              <img src="/web.jpg" alt="Web Development Course" class="w-full h-48 object-cover"/>
              <div class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
              <div class="absolute top-4 right-4 bg-blue-600/90 text-white px-2 py-1 rounded text-sm font-medium">
                Bestseller
              </div>
            </div>

            <div class="p-6">
              <div class="flex items-center space-x-2 mb-3">
            <span
                class="px-3 py-1 rounded-full text-xs font-medium bg-blue-900/50 text-blue-300 border border-blue-700/50">Development</span>
                <span
                    class="px-3 py-1 rounded-full text-xs font-medium bg-purple-900/50 text-purple-300 border border-purple-700/50">Web</span>
              </div>

              <h3 class="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">Modern Web
                Development</h3>
              <p class="text-gray-400 text-sm mb-4">Learn the latest web technologies including HTML5, CSS3,
                JavaScript, and
                modern frameworks.</p>

              <div class="flex items-center text-gray-400 text-sm mb-4">
                <div class="flex items-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span>24 hours</span>
                </div>
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                  </svg>
                  <span>42 lessons</span>
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="w-8 h-8 rounded-full overflow-hidden border-2 border-blue-500">
                    <img src="/ui.jpg" alt="Instructor" class="w-full h-full object-cover"/>
                  </div>
                  <span class="text-sm text-gray-300 ml-2">John Smith</span>
                </div>
                <span
                    class="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">$49.99</span>
              </div>
            </div>
          </div>

          <!-- Course 2 -->
          <div
              class="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-purple-500/10 hover:border-purple-500/30 group">
            <div class="relative">
              <img src="/data.jpg" alt="Data Science Course" class="w-full h-48 object-cover"/>
              <div class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
              <div class="absolute top-4 right-4 bg-purple-600/90 text-white px-2 py-1 rounded text-sm font-medium">
                New
              </div>
            </div>

            <div class="p-6">
              <div class="flex items-center space-x-2 mb-3">
            <span
                class="px-3 py-1 rounded-full text-xs font-medium bg-green-900/50 text-green-300 border border-green-700/50">Data Science</span>
                <span
                    class="px-3 py-1 rounded-full text-xs font-medium bg-purple-900/50 text-purple-300 border border-purple-700/50">Advanced</span>
              </div>

              <h3 class="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">Data Science
                Masterclass</h3>
              <p class="text-gray-400 text-sm mb-4">Master data analysis, machine learning, and data visualization
                with
                practical projects.</p>

              <div class="flex items-center text-gray-400 text-sm mb-4">
                <div class="flex items-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span>36 hours</span>
                </div>
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                  </svg>
                  <span>56 lessons</span>
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="w-8 h-8 rounded-full overflow-hidden border-2 border-purple-500">
                    <img src="/ui.jpg" alt="Instructor" class="w-full h-full object-cover"/>
                  </div>
                  <span class="text-sm text-gray-300 ml-2">Sarah Johnson</span>
                </div>
                <span
                    class="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">$69.99</span>
              </div>
            </div>
          </div>

          <!-- Course 3 -->
          <div
              class="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-blue-500/10 hover:border-blue-500/30 group">
            <div class="relative">
              <img src="/ui.jpg" alt="UX Design Course" class="w-full h-48 object-cover"/>
              <div class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
              <div class="absolute top-4 right-4 bg-gray-800/90 text-white px-2 py-1 rounded text-sm font-medium">
                Popular
              </div>
            </div>

            <div class="p-6">
              <div class="flex items-center space-x-2 mb-3">
            <span
                class="px-3 py-1 rounded-full text-xs font-medium bg-pink-900/50 text-pink-300 border border-pink-700/50">Design</span>
                <span
                    class="px-3 py-1 rounded-full text-xs font-medium bg-blue-900/50 text-blue-300 border border-blue-700/50">UX/UI</span>
              </div>

              <h3 class="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">UX/UI Design
                Principles</h3>
              <p class="text-gray-400 text-sm mb-4">Learn to design beautiful, functional interfaces that users love
                with
                industry best practices.</p>

              <div class="flex items-center text-gray-400 text-sm mb-4">
                <div class="flex items-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span>18 hours</span>
                </div>
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                  </svg>
                  <span>32 lessons</span>
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="w-8 h-8 rounded-full overflow-hidden border-2 border-blue-500">
                    <img src="/favicon.ico" alt="Instructor" class="w-full h-full object-cover"/>
                  </div>
                  <span class="text-sm text-gray-300 ml-2">Michael Chen</span>
                </div>
                <span
                    class="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">$59.99</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-16 bg-gray-800/30 relative overflow-hidden">
      <!-- Background Decoration -->
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div class="absolute top-20 -left-32 w-96 h-96 bg-blue-600/20 rounded-full filter blur-3xl"></div>
        <div class="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/20 rounded-full filter blur-3xl"></div>
      </div>

      <div class="container mx-auto px-4 relative z-10">
        <div class="flex flex-col md:flex-row items-center">
          <!-- Left: Image -->
          <div class="md:w-1/2 mb-8 md:mb-0">
            <div class="relative">
              <!-- Frame decoration -->
              <div
                  class="absolute inset-0 border-2 border-purple-500/30 rounded-lg transform -translate-x-4 translate-y-4"></div>

              <!-- Main image -->
              <div class="relative z-10 rounded-lg overflow-hidden border border-gray-700/50 shadow-xl">
                <img src="/students_1.jpg" alt="About Sami's E-Learning" class="w-full h-auto"/>
              </div>
            </div>
          </div>

          <!-- Right: Content -->
          <div class="md:w-1/2 md:pl-12">
            <h2 class="text-3xl font-bold mb-6">About <span
                class="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Sami's E-Learning</span>
            </h2>

            <p class="text-gray-300 mb-6">
              Founded in 2020, Sami's E-Learning has quickly become a leading online education platform dedicated to
              providing high-quality courses across a variety of disciplines.
            </p>
            <p class="text-gray-300 mb-6">
              Our mission is to make professional education accessible, affordable, and effective for everyone. We
              believe
              that quality education should not be limited by geography, finances, or background.
            </p>

            <div class="grid grid-cols-2 gap-6 mb-8">
              <div>
                <div class="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-400 mr-2" fill="none"
                       viewBox="0 0 24 24"
                       stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span class="font-medium">Industry Experts</span>
                </div>
                <p class="text-gray-400 text-sm pl-7">All instructors have real-world experience</p>
              </div>

              <div>
                <div class="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-400 mr-2" fill="none"
                       viewBox="0 0 24 24"
                       stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span class="font-medium">Flexible Learning</span>
                </div>
                <p class="text-gray-400 text-sm pl-7">Learn at your own pace, anytime, anywhere</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>

    <!--      Testimonials-->

    <section id="testimonials">
      <div class="container mx-auto px-4">
        <div class="text-center mb-10">
          <h2 class="text-3xl font-bold mb-4">What Our Students Say</h2>
          <p class="text-gray-400">Real feedback from real learners</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Testimonial 1 -->
          <div
              class="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-lg transition-all hover:shadow-blue-500/10 group">
            <img src="/students_1.jpg" alt="Student" class="w-16 h-16 rounded-full mb-4"/>
            <h3 class="text-xl font-bold mb-2">John Doe</h3>
            <p class="text-gray-400 mb-4">"The courses are well structured and the instructors are very helpful.
              Highly
              recommend!"</p>
            <span
                class="text-sm text-gray-500">Web Developer, Tech Company</span>
          </div>

          <!-- Testimonial 2 -->
          <div
              class="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-lg transition-all hover:shadow-purple-500/10 group">
            <img src="/students.jpg" alt="Student" class="w-16 h-16 rounded-full mb-4"/>
            <h3 class="text-xl font-bold mb-2">Jane Smith</h3>
            <p class="text-gray-400 mb-4">"I learned so much in a short time. The community is amazing!"</p>
            <span
                class="text-sm text-gray-500">Data Scientist, Data Corp</span>
          </div>

          <!-- Testimonial 3 -->
          <div
              class="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-lg transition-all hover:shadow-blue-500/10 group">
            <img src="/students_1.jpg" alt="Student" class="w-16 h-16 rounded-full mb-4"/>
            <h3 class="text-xl font-bold mb-2">Michael Johnson</h3>
            <p class="text-gray-400 mb-4">"The best online learning experience I've ever had. Highly recommend!"</p>
            <span
                class="text-sm text-gray-500">UX Designer, Creative Agency</span>
          </div>
        </div>
      </div>
    </section>


    <section id="footer" class="bg-gray-900 text-gray-300 py-8">

      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="mb-4 md:mb-0">
            <h2 class="text-lg font-bold">Sami's E-Learning</h2>
            <p class="text-sm">© 2023 Sami's E-Learning. All rights reserved.</p>
          </div>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" class="text-gray-400 hover:text-blue-400 transition-colors">Terms of Service</a>
          </div>

        </div>
      </div>

    </section>
  </div>
</template>
<script setup lang="ts">
</script>