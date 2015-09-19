-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tempo de Geração: 19/09/2015 às 11:30
-- Versão do servidor: 5.5.44-0ubuntu0.14.04.1
-- Versão do PHP: 5.5.9-1ubuntu4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Banco de dados: `ned`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `CORRESP_Cidade`
--

CREATE TABLE IF NOT EXISTS `CORRESP_Cidade` (
  `id_cidade` int(11) NOT NULL AUTO_INCREMENT,
  `st_cidade` varchar(45) NOT NULL,
  `id_estado` int(11) NOT NULL,
  PRIMARY KEY (`id_cidade`,`st_cidade`),
  KEY `fk_cidade_estado_idx` (`id_estado`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estrutura para tabela `CORRESP_Comentario`
--

CREATE TABLE IF NOT EXISTS `CORRESP_Comentario` (
  `id_usuario_perfil` bigint(20) NOT NULL,
  `st_nome` varchar(45) NOT NULL,
  `st_email` varchar(45) NOT NULL,
  `st_trabalho` varchar(45) NOT NULL,
  `st_comentario` varchar(500) NOT NULL,
  `id_cidade` int(11) NOT NULL,
  `dt_data_criacao` datetime NOT NULL,
  `dt_data_alteracao` datetime NOT NULL,
  `bt_ativo` bit(1) NOT NULL DEFAULT b'1',
  PRIMARY KEY (`id_usuario_perfil`,`id_cidade`),
  KEY `fk_comentario_cidade1_idx` (`id_cidade`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura para tabela `CORRESP_Educacao`
--

CREATE TABLE IF NOT EXISTS `CORRESP_Educacao` (
  `id_educacao` int(11) NOT NULL AUTO_INCREMENT,
  `st_educacao` varchar(45) NOT NULL,
  PRIMARY KEY (`id_educacao`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estrutura para tabela `CORRESP_Oab`
--

CREATE TABLE IF NOT EXISTS `CORRESP_Oab` (
  `id_usuario_perfil` bigint(20) NOT NULL,
  `st_numero` int(6) DEFAULT NULL,
  `id_estado` int(11) NOT NULL,
  PRIMARY KEY (`id_usuario_perfil`,`id_estado`),
  KEY `fk_Oab_estado_idx` (`id_estado`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura para tabela `CORRESP_telefone`
--

CREATE TABLE IF NOT EXISTS `CORRESP_telefone` (
  `id_usuario_perfil` bigint(20) NOT NULL,
  `st_telefone` varchar(45) NOT NULL,
  `st_ddd` varchar(45) NOT NULL,
  `id_telefone_tipo` int(11) NOT NULL,
  PRIMARY KEY (`id_usuario_perfil`,`id_telefone_tipo`),
  KEY `fk_telefone_usuario_perfil_idx` (`id_usuario_perfil`),
  KEY `fk_telefone_telefone_tipo_idx` (`id_telefone_tipo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura para tabela `CORRESP_telefone_tipo`
--

CREATE TABLE IF NOT EXISTS `CORRESP_telefone_tipo` (
  `id_telefone_tipo` int(11) NOT NULL AUTO_INCREMENT,
  `st_telefone_tipo` varchar(45) NOT NULL,
  PRIMARY KEY (`id_telefone_tipo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estrutura para tabela `CORRESP_tipo_trabalho`
--

CREATE TABLE IF NOT EXISTS `CORRESP_tipo_trabalho` (
  `id_tipo_trabalho` int(11) NOT NULL AUTO_INCREMENT,
  `st_tipo_trabalho` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_tipo_trabalho`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estrutura para tabela `CORRESP_servico`
--

CREATE TABLE IF NOT EXISTS `CORRESP_servico` (
  `id_servico` int(11) NOT NULL AUTO_INCREMENT,
  `st_servico` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_servico`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estrutura para tabela `CORRESP_especialidade`
--

CREATE TABLE IF NOT EXISTS `CORRESP_especialidade` (
  `id_especialidade` int(11) NOT NULL AUTO_INCREMENT,
  `st_especialidade` varchar(45) NOT NULL,
  PRIMARY KEY (`id_especialidade`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estrutura para tabela `CORRESP_estado`
--

CREATE TABLE IF NOT EXISTS `CORRESP_estado` (
  `id_estado` int(11) NOT NULL AUTO_INCREMENT,
  `st_estado` varchar(45) NOT NULL,
  PRIMARY KEY (`id_estado`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estrutura para tabela `CORRESP_usuario`
--

CREATE TABLE IF NOT EXISTS `CORRESP_usuario` (
  `id_usuario` bigint(20) NOT NULL AUTO_INCREMENT,
  `st_email` varchar(45) NOT NULL,
  `st_cpf_cnpj` varchar(45) DEFAULT NULL,
  `st_senha` varchar(45) DEFAULT NULL,
  `dt_data_criacao` datetime NOT NULL,
  `dt_data_alteracao` datetime NOT NULL,
  `bt_ativo` bit(1) DEFAULT b'1',
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `email_UNIQUE` (`st_email`),
  UNIQUE KEY `st_cpf_cnpj_UNIQUE` (`st_cpf_cnpj`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estrutura para tabela `CORRESP_usuario_servico`
--

CREATE TABLE IF NOT EXISTS `CORRESP_usuario_servico` (
  `id_servico` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario_perfil` bigint(20) NOT NULL,
  PRIMARY KEY (`id_servico`,`id_usuario_perfil`),
  KEY `fk_usuario_servico_id_usuario_perfil_idx` (`id_usuario_perfil`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estrutura para tabela `CORRESP_usuario_cidade_atendida`
--

CREATE TABLE IF NOT EXISTS `CORRESP_usuario_cidade_atendida` (
  `id_usuario_perfil` bigint(20) NOT NULL,
  `id_cidade` int(11) NOT NULL,
  PRIMARY KEY (`id_usuario_perfil`,`id_cidade`),
  KEY `fk_usuario_cidade_atendida_id_usuario_perfil1_idx` (`id_usuario_perfil`),
  KEY `fk_usuario_cidade_atendida_cidade_idx` (`id_cidade`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura para tabela `CORRESP_usuario_perfil`
--

CREATE TABLE IF NOT EXISTS `CORRESP_usuario_perfil` (
  `id_usuario_perfil` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_usuario` bigint(20) NOT NULL,
  `st_nome` varchar(45) NOT NULL,
  `dt_data_nascimento` datetime NOT NULL,
  `id_educacao` int(11) NOT NULL,
  `id_tipo_trabalho` int(11) NOT NULL,
  `bt_oab` bit(1) DEFAULT b'0',
  `bt_cert_Digital` bit(1) DEFAULT b'0',
  `st_site` varchar(45) DEFAULT NULL,
  `st_sobre` varchar(200) DEFAULT NULL,
  `st_descricao` varchar(200) DEFAULT NULL,
  `dt_data_criacao` datetime DEFAULT NULL,
  `dt_data_alteracao` datetime DEFAULT NULL,
  `bt_ativo` bit(1) DEFAULT b'1',
  PRIMARY KEY (`id_usuario_perfil`,`id_usuario`,`id_educacao`,`id_tipo_trabalho`),
  KEY `fk_id_usuario_perfil_id_usuario_idx` (`id_usuario`),
  KEY `fk_id_usuario_perfil_id_educacao_idx` (`id_educacao`),
  KEY `fk_id_usuario_perfil_id_tipo_trabalho_idx` (`id_tipo_trabalho`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estrutura para tabela `CORRESP_usuario_especialidade`
--

CREATE TABLE IF NOT EXISTS `CORRESP_usuario_especialidade` (
  `id_usuario_perfil` bigint(20) NOT NULL,
  `id_especialidade` int(11) NOT NULL,
  PRIMARY KEY (`id_usuario_perfil`,`id_especialidade`),
  KEY `fk_usuario_especialidade_id_especialidade_idx` (`id_especialidade`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Restrições para dumps de tabelas
--

--
-- Restrições para tabelas `City`
--
ALTER TABLE `City`
  ADD CONSTRAINT `fk_City_State1` FOREIGN KEY (`id_State`) REFERENCES `State` (`id_State`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Restrições para tabelas `coments`
--
ALTER TABLE `coments`
  ADD CONSTRAINT `fk_coments_City1` FOREIGN KEY (`id_City`) REFERENCES `City` (`id_City`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_coments_userProfile1` FOREIGN KEY (`id_userProfile`) REFERENCES `userProfile` (`id_userProfile`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Restrições para tabelas `Oab`
--
ALTER TABLE `Oab`
  ADD CONSTRAINT `fk_Oab_State1` FOREIGN KEY (`id_State`) REFERENCES `State` (`id_State`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Oab_userProfile1` FOREIGN KEY (`id_userProfile`) REFERENCES `userProfile` (`id_userProfile`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Restrições para tabelas `phones`
--
ALTER TABLE `phones`
  ADD CONSTRAINT `fk_phones_phoneType1` FOREIGN KEY (`id_phoneType`) REFERENCES `phoneType` (`id_phoneType`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_phones_user_profile1` FOREIGN KEY (`id_UserProfile`) REFERENCES `userProfile` (`id_userProfile`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Restrições para tabelas `UserAttendedServices`
--
ALTER TABLE `UserAttendedServices`
  ADD CONSTRAINT `fk_UserAttendedServices_services1` FOREIGN KEY (`id_services`) REFERENCES `services` (`id_services`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_UserAttendedServices_userProfile1` FOREIGN KEY (`id_userProfile`) REFERENCES `userProfile` (`id_userProfile`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Restrições para tabelas `UserCitiesServed`
--
ALTER TABLE `UserCitiesServed`
  ADD CONSTRAINT `fk_CitiesServed_City1` FOREIGN KEY (`id_City`) REFERENCES `City` (`id_City`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_citiesServed_userProfile1` FOREIGN KEY (`id_userProfile`) REFERENCES `userProfile` (`id_userProfile`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Restrições para tabelas `userProfile`
--
ALTER TABLE `userProfile`
  ADD CONSTRAINT `fk_userProfile_Post1` FOREIGN KEY (`id_PostJob`) REFERENCES `PostJob` (`id_Post`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_user_profile_education1` FOREIGN KEY (`id_education`) REFERENCES `education` (`id_education`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_user_profile_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Restrições para tabelas `UserSpecialities`
--
ALTER TABLE `UserSpecialities`
  ADD CONSTRAINT `fk_UserSpeciality_Speciality1` FOREIGN KEY (`id_Speciality`) REFERENCES `Speciality` (`id_Speciality`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_UserSpeciality_userProfile1` FOREIGN KEY (`id_userProfile`) REFERENCES `userProfile` (`id_userProfile`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
