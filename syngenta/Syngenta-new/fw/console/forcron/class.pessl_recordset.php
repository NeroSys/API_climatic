<?php
/*
 * Project:     Class Pessl Recordset
 * File:        class.pessl_recordset.php
 *
 * @copyright 2007 Pessl Instruments Gmbh
 * @author Roman Postovalov <roman.postovalov@metos.at>
*/

class PesslRecordset {
	var $DataSetMain;
	var	$RecordNumber;
	var $_eof;

	function & PesslRecordset(&$DateSetMainRef){
		$this->RecordNumber = 0;
		$this->_eof = false;
		$this->DataSetMain = $DateSetMainRef;
  	}

	function & FetchRow($type = "array"){

		$_ArrayOfStringRow  = array();

        If ($this->RecordNumber >= $this->DataSetMain["ReturnRecordSetInfo"]["s_row_count"] - 1){        	$this->_eof = true;
        	$ret = false;
        	return $ret;        }

        $_ArrayOfStringRow = array_slice($this->DataSetMain["ReturnDataSet"], $this->RecordNumber, $this->DataSetMain["ReturnRecordSetInfo"]["s_field_count"]);

        $this->RecordNumber = $this->RecordNumber + $this->DataSetMain["ReturnRecordSetInfo"]["s_field_count"];

   		if ($type == "assoc") {
   			$_assoc_array = array();
            $_fields = &$this->GetFields();

   			for($k = 0; $k < count($_ArrayOfStringRow); $k++) {

				$_assoc_array[$_fields[$k]] = $_ArrayOfStringRow[$k];

   			}

   			return $_assoc_array;
   		} else {   			return $_ArrayOfStringRow;   		}
  	}

	function MoveFirst() {		$this->RecordNumber = 0;	}

  	function NumRows(){
		If ($this->DataSetMain["ReturnRecordSetInfo"]["s_row_count"] == 0) {
			return 0;
		} else {			return ($this->DataSetMain["ReturnRecordSetInfo"]["s_row_count"] / $this->DataSetMain["ReturnRecordSetInfo"]["s_field_count"]);
		}
  	}

  	function &GetFields(){
		$fields  = array();

  		for ($k = 0; $k < count($this->DataSetMain["ReturnDataInfo"]); $k++) {
        	$fields[] = $this->DataSetMain["ReturnDataInfo"][$k]["s_name"];
  		}

		return $fields;
  	}

  	function EOF(){
		return $this->_eof;
  	}

  	function BOF(){
		return (($this->RecordNumber == 0) ? true : false);
  	}
}
?>