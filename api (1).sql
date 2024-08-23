-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 07, 2024 at 09:34 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `api`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `flights`
--

CREATE TABLE `flights` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2024_07_19_085729_create_personal_access_tokens_table', 1),
(5, '2024_07_19_090006_create_posts_table', 1),
(6, '2024_07_29_155848_update_posts_table', 2),
(7, '2024_08_04_094004_flights', 3);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(44, 'App\\Models\\User', 11, 'api_token', '85340b5a37513a7fce2ce7605fdac931828b18ccff8f4fb25b17c5ffe2229468', '[\"*\"]', '2024-08-05 13:00:05', NULL, '2024-08-05 12:27:59', '2024-08-05 13:00:05'),
(47, 'App\\Models\\User', 12, 'api_token', '5a26f00ebb373b87bea67cd5a2a0d439230d66c52b86a82bcdb8518e39131d84', '[\"*\"]', NULL, NULL, '2024-08-06 06:32:38', '2024-08-06 06:32:38'),
(48, 'App\\Models\\User', 4, 'api_token', 'e7d3034236abf42f9848dfa52a6d104d5531b7b4d023635413463e8230eaa8cf', '[\"*\"]', '2024-08-06 09:30:41', NULL, '2024-08-06 09:19:03', '2024-08-06 09:30:41'),
(49, 'App\\Models\\User', 4, 'api_token', 'f428cf90c54e63f7a14c8b96fb2ef9af31e9f09fe6e2c442021feea1d96ccdae', '[\"*\"]', '2024-08-06 18:21:35', NULL, '2024-08-06 14:51:00', '2024-08-06 18:21:35'),
(51, 'App\\Models\\User', 4, 'api_token', '10694d141093d91d5aeb11491d48eb96d4a7843d9929572756bc606f014bc06a', '[\"*\"]', '2024-08-07 09:31:43', NULL, '2024-08-07 09:10:22', '2024-08-07 09:31:43');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `tag` varchar(100) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `title`, `content`, `user_id`, `created_at`, `updated_at`, `image`, `tag`, `deleted_at`) VALUES
(3, 'Cofa post', 'hello from postman', 2, NULL, NULL, '', NULL, NULL),
(4, 'Hello', '#iPhone manual is now made simple https://www.amazon.com/dp/B0741RLNJP #amazon #usa #uk #italy #girls #boys #library #student #tech #apple #canada', 4, NULL, '2024-08-07 09:20:43', '', NULL, '2024-08-07 09:20:43'),
(5, 'select * from posts', 'bad', 4, NULL, NULL, '', NULL, NULL),
(6, 'let x = 5;\nlet y = 6;\nlet z = x + y;', 'bad', 4, NULL, NULL, '', NULL, NULL),
(9, 'hello', 'bad2', 4, NULL, NULL, '', NULL, NULL),
(10, 'let x = 5;\\nlet y = 6;\\nlet z = x + y;', 'bad2', 4, NULL, NULL, '', NULL, NULL),
(11, 'let x = 5;\\nlet y = 6;\\nlet z = x + y;', 'bad2', 4, NULL, NULL, '', NULL, NULL),
(12, '<p>welcome</p>', 'bad2', 4, NULL, NULL, '', NULL, NULL),
(13, 'welcome', 'bad2', 4, NULL, NULL, '', NULL, NULL),
(14, 'let x = 5;\\nlet y = 6;\\nlet z = x + y;', 'bad3', 4, NULL, NULL, '', NULL, NULL),
(15, 'How To Store A New FIle In DB', 'by using some storage function', 4, NULL, NULL, 'avatars/wTD33lGYmjltx8dnVtAJuioUeFmFSBhxssQfq7dk.jpg', NULL, NULL),
(16, 'What is a laravel', 'by using some storage function', 4, NULL, NULL, 'avatars/XsZr0GxmCJFvwBFFuSqnQQbt8VNlzfEtuvZmfALd.png', NULL, NULL),
(17, 'How to do this', 'this is the content of the project', 4, '2024-08-06 09:30:42', '2024-08-06 09:30:42', 'postsImage/fM4bEwT0Qo2RSYVlaw8C0smzXzA8yqfZAtXPZRUD.png', 'negative', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `bio`, `image`, `deleted_at`) VALUES
(1, 'mahmoud', 'cofa@gmail.com', NULL, '$2y$12$AbkJEpk.tKZBngQ1G8iL0e1aiZQWcJ5zJIg/UMFHeJagshR1nfCn', NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'Mahmoud', 'mahmoud@gamil.com', NULL, '$2y$12$KG4JqTZ2px8085GpQ77mXOWn5OUIvkU.vO.OSJlbPCdqH3.MhfDaO', NULL, NULL, NULL, NULL, NULL, NULL),
(3, 'Gamal', 'gamal@gamil.com', NULL, '$2y$12$W4tNlU29I/bVQXCXSyUJTeSaO.X3gE4FGwtfYTIf4QoB936awNcr2', NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'Zezo', 'zezo@gmail.com', NULL, '$2y$12$FNZ1/W60Vm6NBE14KjS4NejUctC946j5I1WxNNTKVJoZB.xJ9WlPa', NULL, NULL, '2024-08-07 09:30:11', NULL, NULL, NULL),
(5, 'hoda', 'hoda@gamil.com', NULL, '$2y$12$WDUGMnKhAQCGy280sn51cOAksZHLwsYHz2Xy4X22DHj0S/IAIG0E.', NULL, NULL, NULL, NULL, NULL, NULL),
(6, 'Alaa', 'alaa@gamil.com', NULL, '$2y$12$Y43jFNx2US954ABbGqzrW.YGdhsiCDTpaRQmsCV1MhRzpi9HnplU.', NULL, NULL, NULL, NULL, NULL, NULL),
(7, 'Hanem', 'hanem@gamil.com', NULL, '$2y$12$JLJ..aEVJm513Npc2eojKOO8nCVNODSoOGBkEle0kD12.0yq09Eem', NULL, NULL, NULL, NULL, NULL, NULL),
(11, 'esraa', 'esraa@gamil.com', NULL, '$2y$12$bDR6TcR0w7BAyFQSR3gPnuhYOR9lMMkqrlqzbG/CFVpY8EAEEeLoG', NULL, '2024-08-05 12:27:58', '2024-08-05 12:27:58', 'I\'m a Laravel Developer', 'avatars/V3YczBzRn1mhrVLspi7NdiGKNtnv1B8IiqYHs8Ag.jpg', NULL),
(12, 'Ahmed', 'ahmed@gmail.com', NULL, '$2y$12$4JdNLli5bs8PoFxEZvuYX.dRcJk1wFrgFLesuX9Rug5ah8R0nN1oK', NULL, '2024-08-06 06:32:38', '2024-08-06 06:32:38', 'I\'m a programming', 'avatars/l99Oxh7hPql40xHAQWfkUj71hnScDjpm7fS9z0xy.png', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `flights`
--
ALTER TABLE `flights`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `posts_user_id_foreign` (`user_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `flights`
--
ALTER TABLE `flights`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
