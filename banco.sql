
-- -----------------------------------------------------
-- Schema colegiosUnivap
-- -----------------------------------------------------
CREATE database IF NOT EXISTS `colegiosUnivap` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema colegiosunivap
-- -----------------------------------------------------
USE `colegiosUnivap` ;

-- -----------------------------------------------------
-- Table `colegiosUnivap`.`Aluno`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `colegiosUnivap`.`Aluno` (
  `matricula` INT primary key NOT NULL,
  `nome` VARCHAR(128) NULL,
  `email` VARCHAR(45) NULL,
  `wpp` BIGINT NULL,
  `senha` VARCHAR(32) NULL);


-- -----------------------------------------------------
-- Table `colegiosUnivap`.`Professor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `colegiosUnivap`.`Professor` (
  `registro` INT primary key NOT NULL,
  `nome` VARCHAR(128) NULL,
  `email` VARCHAR(45) NULL,
  `senha` VARCHAR(32) NULL,
  `tipo` INT NULL COMMENT '1 - Professor\n2 - Professor Administrador\n');

-- -----------------------------------------------------
-- Table `colegiosUnivap`.`Turma`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `colegiosUnivap`.`Turma` (
  `idTurma` INT primary key NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NULL,
  `abreviacao` VARCHAR(45) NULL,
  `ano` INT NULL);


-- -----------------------------------------------------
-- Table `colegiosUnivap`.`Disciplina`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `colegiosUnivap`.`Disciplina` (
  `idDisciplina` INT primary key NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NULL,
  `Professor_registro` INT NOT NULL,
  `Turma_idTurma` INT NOT NULL,
  CONSTRAINT `fk_Disciplina_Professor1`
    FOREIGN KEY (`Professor_registro`)
    REFERENCES `colegiosUnivap`.`Professor` (`registro`),
  CONSTRAINT `fk_Disciplina_Turma1`
    FOREIGN KEY (`Turma_idTurma`)
    REFERENCES `colegiosUnivap`.`Turma` (`idTurma`));


-- -----------------------------------------------------
-- Table `colegiosUnivap`.`Nota`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `COLEGIOSUNIVAP`.`NOTA` (
  `IDNOTA` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `DISCIPLINA_IDDISCIPLINA` INT NOT NULL,
  `ALUNO_MATRICULA` INT NOT NULL,
  `BIMESTRE` INT NULL,
  `NOTA` FLOAT NULL,
  `ULTIMAALTERACAO` DATETIME NULL,
  `TIPONOTA` INT NULL COMMENT '1 - Projeto.\n2 - Prova.',
  `FEZLISTA` INT NULL,
  CONSTRAINT `FK_NOTA_DISCIPLINA1` FOREIGN KEY (`DISCIPLINA_IDDISCIPLINA`) REFERENCES `COLEGIOSUNIVAP`.`DISCIPLINA` (`IDDISCIPLINA`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_NOTA_ALUNO1` FOREIGN KEY (`ALUNO_MATRICULA`) REFERENCES `COLEGIOSUNIVAP`.`ALUNO` (`MATRICULA`) ON DELETE NO ACTION ON UPDATE NO ACTION
);


-- -----------------------------------------------------
-- Table `colegiosUnivap`.`PedidoRevisao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `colegiosUnivap`.`PedidoRevisao` (
  `idPedidoRevisao` INT primary key NOT NULL AUTO_INCREMENT,
  `Nota_idNota` INT  NOT NULL,
  `descricao` VARCHAR(512) NULL,
  `status` INT NULL COMMENT '1 - Não avaliado\n2 - Aceito e Alterado\n3 - Recusado e não alterado',
  
  CONSTRAINT `fk_PedidoRevisao_Nota1`
    FOREIGN KEY (`Nota_idNota`)
    REFERENCES `colegiosUnivap`.`Nota` (`idNota`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `colegiosUnivap`.`HistoricoAlteracoes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `colegiosUnivap`.`HistoricoAlteracoes` (
  `Nota_idNota` INT NOT NULL,
  `nota` FLOAT NULL,
  `ultimaAlteracao` DATETIME NULL,
  CONSTRAINT `fk_Historico_Nota1`
    FOREIGN KEY (`Nota_idNota`)
    REFERENCES `colegiosUnivap`.`Nota` (`idNota`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
