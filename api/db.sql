CREATE TABLE `leads` (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `service` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `ip` VARCHAR(255) NOT NULL,
  `timestamp` TIMESTAMP NOT NULL,
  INDEX (`service`, `timestamp`)
) ENGINE InnoDB DEFAULT CHARSET=utf8;
